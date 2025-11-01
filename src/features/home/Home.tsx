import { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { DataGrid, type GridColDef, GridActionsCellItem, GridRowModes, type GridRowModesModel, type GridRowId } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { v4 as uuidv4 } from 'uuid';

import {
    useCreatePatientMutation,
    useDeletePatientMutation,
    useGetPatientsQuery,
    useUpdatePatientMutation
} from "../../business/patient/patientApi.ts";
import type {Patient} from "../../business/patient/models/patient.ts";

export default function Home() {
    const { data: patients = [], isLoading, refetch } = useGetPatientsQuery();
    const [createPatient] = useCreatePatientMutation();
    const [updatePatient] = useUpdatePatientMutation();
    const [deletePatient] = useDeletePatientMutation();

    const [rows, setRows] = useState<Patient[]>([]);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

    // Synchroniser les données du backend
    useEffect(() => {
        setRows(patients);
    }, [patients]);

    // Handlers
    const handleView = (row: Patient) => {
        alert(`Patient: ${row.lastName} ${row.firstName}\nEmail: ${row.email ?? '-'}\nTéléphone: ${row.phone ?? '-'}`);
    };

    const handleEdit = (id: GridRowId) => () => {
        setRowModesModel(prev => ({ ...prev, [id]: { mode: GridRowModes.Edit } }));
    };

    const handleCancel = (id: GridRowId) => () => {
        setRowModesModel(prev => ({ ...prev, [id]: { mode: GridRowModes.View, ignoreModifications: true } }));
    };

    const handleDelete = (id: GridRowId) => async () => {
        const row = rows.find(r => r.id === id);
        if (!row) return;
        const confirmDelete = window.confirm(`Supprimer ${row.lastName} ${row.firstName} ?`);
        if (!confirmDelete) return;

        if (typeof row.id === 'string') {
            // Ligne temporaire → suppression locale
            setRows(prev => prev.filter(r => r.id !== id));
        } else {
            // Ligne existante → suppression backend
            await deletePatient(row.id).unwrap();
            refetch();
        }
    };

    const processRowUpdate = (newRow: Patient) => {
        setRows(prev => prev.map(r => (r.id === newRow.id ? newRow : r)));
        return newRow;
    };

    const handleSave = (id: GridRowId) => async () => {
        const row = rows.find(r => r.id === id);
        if (!row) return;

        if (typeof row.id === 'string') {
            // Nouvelle entrée → envoyer au backend sans ID
            const { firstName, lastName, birthDate, phone, email } = row;
            const created = await createPatient({ firstName, lastName, birthDate, phone, email }).unwrap();
            // Remplacer la ligne temporaire par celle renvoyée par le backend
            setRows(prev => prev.map(r => (r.id === id ? created : r)));
        } else {
            // Mise à jour
            await updatePatient(row).unwrap();
            refetch();
        }

        setRowModesModel(prev => ({ ...prev, [id]: { mode: GridRowModes.View } }));
    };

    const handleAddRow = () => {
        const tempId = uuidv4(); // ID temporaire pour React uniquement
        const newRow: Patient = {
            id: tempId,
            firstName: '',
            lastName: '',
            birthDate: new Date().toISOString().slice(0, 10),
            phone: '',
            email: '',
        };
        setRows(prev => [newRow, ...prev]);
        setRowModesModel(prev => ({ ...prev, [tempId]: { mode: GridRowModes.Edit } }));
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'lastName', headerName: 'Nom', flex: 1, minWidth: 150, editable: true },
        { field: 'firstName', headerName: 'Prénom', flex: 1, minWidth: 150, editable: true },
        {
            field: 'birthDate',
            headerName: 'Date de naissance',
            minWidth: 160,
            editable: true,
            valueFormatter: ({ value }) => value ? new Date(value as string).toLocaleDateString() : ''
        },
        { field: 'phone', headerName: 'Téléphone', minWidth: 150, flex: 1, editable: true },
        { field: 'email', headerName: 'Email', minWidth: 200, flex: 1, editable: true },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 160,
            getActions: (params) => {
                const id = params.id;
                const row = params.row as Patient;
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem key="save" icon={<SaveIcon />} label="Enregistrer" onClick={handleSave(id)} />,
                        <GridActionsCellItem key="cancel" icon={<CloseIcon />} label="Annuler" onClick={handleCancel(id)} />,
                    ];
                }

                return [
                    <GridActionsCellItem key="view" icon={<VisibilityIcon />} label="Voir" onClick={() => handleView(row)} />,
                    <GridActionsCellItem key="edit" icon={<EditIcon />} label="Modifier" onClick={handleEdit(id)} />,
                    <GridActionsCellItem key="delete" icon={<DeleteIcon />} label="Supprimer" onClick={handleDelete(id)} color="error" />,
                ];
            },
        },
    ];

    return (
        <Box p={3} display="flex" flexDirection="column" gap={2}>
            <Typography variant="h4" component="h1">Liste des patients</Typography>

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddRow}
                sx={{ alignSelf: 'flex-start', mb: 1 }}
            >
                Créer un patient
            </Button>

            <Box sx={{ height: 520, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    loading={isLoading}
                    editMode="row"
                    processRowUpdate={processRowUpdate}
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={setRowModesModel}
                    disableRowSelectionOnClick
                />
            </Box>
        </Box>
    );
}

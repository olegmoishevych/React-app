import React from 'react'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star'
import IconButton from '@mui/material/IconButton'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import { formatDate } from 'utils'
import { deleteCardTC, editCardTC } from 'redux/cardsReducer'
import { useAppDispatch } from 'redux/store'
import { DeleteCardButton } from './DeleteCardButton'

export type PackType = {
    id: string
    question: string
    answer: string
    lastUpdated: string
    grade: number
}

type PropsType = {
    row: PackType
    packId: string
}

export const CardRow: React.FC<PropsType> = ({ row, packId }) => {
    const dispatch = useAppDispatch()

    const onDeleteCardHandler = () => {
        if (!packId) return
        dispatch(deleteCardTC(row.id, packId))
    }

    const onEditCardHandler = (id: string, question: string, answer: string) => {
        if (!packId) return
        dispatch(editCardTC(id, question + '-edited question', answer + '-edited answer', packId))
    }

    return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
                {row.question}
            </TableCell>
            <TableCell align="center">{row.answer}</TableCell>
            <TableCell align="center">{formatDate(row.lastUpdated)}</TableCell>
            <TableCell align="right">
                <Rating
                    name="card grade"
                    value={row.grade}
                    precision={0.1}
                    readOnly
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
            </TableCell>
            <TableCell align="right">
                <IconButton onClick={() => onEditCardHandler(row.id, row.question, row.answer)}>
                    <DriveFileRenameOutlineIcon />
                </IconButton>
                <DeleteCardButton cardName={row.question} onSubmit={onDeleteCardHandler} />
            </TableCell>
        </TableRow>
    )
}

import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/store'
import { Navigate, useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Path } from 'app/AppRoutes'
import { setErrorAC } from 'redux/appReducer'
import { fetchCardsTC } from 'redux/cardsReducer'
import { BackToPacksListButton } from 'components/BackToPacksListButton'
import { CardsTable } from 'components/CardsTable'
import { CardsPagination } from 'components/CardsPagination'
import { MyPackButtonWithMenu } from './MyPackButtonWithMenu'
import { CardsSearchInput } from 'components/CardsSearchInput'
import { PrimaryButton } from 'components/PrimaryButton'
import { AddNewCardDialog } from 'components/cardDialogs/AddNewCardDialog'

export const MyPack: React.FC = () => {
    const userId = useAppSelector((state) => state.auth.profileData.id)
    const cardsState = useAppSelector((state) => state.cards)
    const dispatch = useAppDispatch()
    const { packId } = useParams<'packId'>()
    const [isAddNewCardOpen, setIsAddNewCardOpen] = useState(false)

    useEffect(() => {
        if (packId) dispatch(fetchCardsTC(packId))
    }, [
        cardsState.sortCards,
        cardsState.page,
        cardsState.pageCount,
        cardsState.cardQuestion,
        packId,
        dispatch,
    ])

    if (cardsState.packUserId !== '' && cardsState.packUserId !== userId) {
        dispatch(setErrorAC("It's not yours Cards Pack"))
        return <Navigate to={Path.packsList} />
    }

    const rows = cardsState.cards.map((c) => ({
        id: c._id,
        question: c.question,
        answer: c.answer,
        lastUpdated: c.updated,
        grade: c.grade,
    }))

    return (
        <Container
            sx={{
                display: 'flex',
                height: '100vh',
                justifyContent: 'center',
            }}
        >
            <Stack width={'100%'} sx={{ m: 3, alignItems: 'center' }}>
                <Box width={'100%'} marginBottom={2}>
                    <BackToPacksListButton />
                </Box>
                <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    width={'100%'}
                    marginBottom={2}
                >
                    <Box display={'flex'} alignItems={'center'}>
                        <Typography component="span" variant={'h5'}>
                            My Pack
                        </Typography>
                        <MyPackButtonWithMenu />
                    </Box>
                    <PrimaryButton onClick={() => setIsAddNewCardOpen(true)}>
                        Add new card
                    </PrimaryButton>
                    <AddNewCardDialog
                        open={isAddNewCardOpen}
                        onClose={() => setIsAddNewCardOpen(false)}
                    />
                </Box>
                <CardsSearchInput width={'100%'} />
                <br />
                {packId && packId !== '' && (
                    <>
                        <CardsTable rows={rows} />
                        <CardsPagination />
                    </>
                )}
            </Stack>
        </Container>
    )
}

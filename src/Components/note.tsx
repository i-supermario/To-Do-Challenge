import { Box, Button, Checkbox, Input, Typography } from "@mui/material";

export interface NoteI{ 
    id: number,
    title: string, 
    tags: string[], 
    content: string, 
    completed: boolean 
}

interface NoteProps{
    note: NoteI, 
    updateCheckedList: (id: number) => void
}

export default function Note({note, updateCheckedList}: NoteProps){

    return(
        <>
            <Box display="flex">
                <Checkbox checked={note.completed} onClick={()=>updateCheckedList(note.id)} />
                <Typography width="100px" padding="10px">{note.title}</Typography>
                <Typography width="300px" variant="body1" padding="10px" textOverflow="ellipsis">{note.content}</Typography>
                <Typography width="150px" variant="caption" padding="10px" textOverflow="ellipsis">{note.tags.map(tag => `#${tag} `)}</Typography>
            </Box>
        </>
    )
}
'use client'
import { useEffect, useState } from "react";
import Note, { NoteI } from "./note";
import { Button, Container, Box, TextField, Typography, Checkbox } from "@mui/material";

const mockNotes: NoteI[] = [
    {
        id: 1,
        title: "Buy groceries",
        tags: ["shopping", "food"],
        content: "Milk, eggs, bread",
        completed: false
    },
    {
        id: 2,
        title: "Finish project",
        tags: ["work"],
        content: "Complete tasks A, B, and C",
        completed: false
    },
    {
        id: 3,
        title: "Exercise",
        tags: ["health"],
        content: "Go for a run",
        completed: true
    },
    {
        id: 4,
        title: "Read book",
        tags: ["leisure"],
        content: "Chapter 5",
        completed: false
    }
]

export default function List() {
    const [permanentList,setPermanentList] = useState<NoteI[]>(mockNotes)
    const [notesList, setNotesList] = useState<NoteI[]>(mockNotes)
    const [popup,setPopup] = useState<boolean>(false)
    const [atomic,setAtomic] = useState<number>(notesList.length)

    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [completed,setCompleted] = useState<boolean>(false)
    const [tags,setTags] = useState<string[]>([])

    const [isAllChecked,setIsAllChecked] = useState<boolean>(false)
    const [searchText, setSearchText] = useState<string>("")

    console.log(permanentList)

    useEffect(()=>{
        let checked: boolean = true
        notesList.forEach(note => {
            checked = checked && note.completed 
        })
        setIsAllChecked(checked)
    },[notesList])

    const addNote = () => {
        const updatedNotesList = [...notesList,{
            id: atomic,
            title: title,
            content: content,
            tags: tags,
            completed: completed
        }]
        setNotesList(updatedNotesList)
        setPermanentList(updatedNotesList)
        setContent("")
        setTitle("")
        setTags([])
        setCompleted(false)
        setAtomic(val => val + 1)
    }

    const checkAllNotes = () => {
        const updatedNotesList = notesList.map(note => {
                return {
                    ...note,
                    completed: !isAllChecked
                };
        });
        setNotesList(updatedNotesList)
        const updatedPermanentList = permanentList.map(note => {
            return {
                ...note,
                completed: !isAllChecked
            };
    });
        setPermanentList(updatedPermanentList)
    }

    const searchTags = (text: string) => {
        const updatedNotesList = notesList.filter(note => note.title.toLowerCase().includes(text.toLowerCase()) || note.content.toLowerCase().includes(text.toLowerCase()))
        setNotesList(updatedNotesList)
    }

    const updateCheckedList = (id: number) => {
        const updatedNotesList = notesList.map(note => {
            if (note.id === id) {
                return {
                    ...note,
                    completed: !note.completed
                };
            }
            return note;
        });
        setNotesList(updatedNotesList);
        const updatedPermanentList = permanentList.map(note => {
            if (note.id === id) {
                return {
                    ...note,
                    completed: !note.completed
                };
            }
            return note;
        });
        setPermanentList(updatedPermanentList)
    }
    
    
    const deleteNote = (id: number) => {
        setNotesList(list => list.filter(note => note.id != id))
    }

    return(
        <>
            <Container>
                <Box display="flex" columnGap="30px" >
                    <Button variant="outlined" onClick={()=>setPopup(true)} >Add +</Button>
                    <TextField variant="outlined" label="Search" size="small" onChange={(e)=>{
                        // setSearchText(e.target.value)
                        e.target.value.length == 0 ? setNotesList(permanentList) : searchTags(e.target.value)
                    }} />
                </Box>
                {
                    popup &&        
                    <>
                        <Box 
                            display="flex" 
                            flexDirection="column" 
                            width="400px"
                            padding="10px" 
                            position="absolute" 
                            zIndex="3"
                            bgcolor="white"
                            border="2px solid orange"
                            rowGap="20px"
                            borderRadius="10px"
                            >
                            <Typography variant="h3" >Add new note</Typography>
                            <Typography>Id: {atomic+1} </Typography>
                            <Box display="flex" columnGap="10px">
                                <Typography width="150px" >Title:</Typography>
                                <TextField value={title} onChange={(e)=>setTitle(e.target.value)} />
                            </Box>
                            <Box display="flex" columnGap="10px">
                                <Typography width="150px">Content:</Typography>
                                <TextField value={content} onChange={(e)=>setContent(e.target.value)} />
                            </Box>
                            <Box display="flex" columnGap="10px">
                                <Typography width="150px">Tags(space seperated list):</Typography>
                                <TextField value={tags.join(" ")} onChange={(e)=>setTags(e.target.value.split(" "))} />
                            </Box>
                            <Box display="flex" columnGap="10px">
                                <Typography width="140px">Completed:</Typography>
                                <Checkbox value={completed} onChange={(e)=>setCompleted(e.target.checked)} />
                            </Box>
                            <Box display="flex" columnGap="20px">
                                <Button variant="outlined" color="success" onClick={()=>{
                                    addNote()
                                    setPopup(false)
                                }} >Done</Button>
                                <Button variant="outlined" color="error" onClick={()=>setPopup(false)}>
                                    Close
                                </Button>
                            </Box>
                        </Box>
                    </>
                }
                {
                    notesList.length!=0 && 
                    <>
                        <Box display="flex">
                            <Checkbox checked={isAllChecked} onClick={() => checkAllNotes()} />
                            <Typography width="100px" padding="10px" >Check All</Typography>
                        </Box>
                    </>
                }
                {
                    notesList.map( _ => 
                     <>
                        <Box key={_.id} display="flex">
                            <Note 
                                note={_}
                                updateCheckedList={updateCheckedList}
                            />
                            <Button variant="outlined" color="error" onClick={()=>deleteNote(_.id)}>Remove</Button>
                        </Box>
                     </>
                    )
                }
            </Container>
        </>
    )
}


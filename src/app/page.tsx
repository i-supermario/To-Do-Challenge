import List from "@/Components/list";
import { Container, Typography } from "@mui/material";

export default function Home() {
  return (
    <>
      <Container sx={{
        display:"flex",
        flexDirection:"column",
        padding:"50px",
        border:"2px solid green",
      }}>
        <Typography variant="h3" paddingX="40px" paddingY="10px">
          To Do List
        </Typography>
        <List/>
      </Container>
    </>
  )
}

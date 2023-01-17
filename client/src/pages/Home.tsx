import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {IJobDataType} from "../types/jobInterface";

type Props = {};

const Home = (props: Props) => {
  const [data, setData] = useState<IJobDataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://localhost:8080/api/jobs";
      const {data} = await axios.get(url);
      setData(data.reverse());
    };

    fetchData();
  }, [data]);

  //delete request
  const onDelete = async (id: string) => {
    try {
      const url = `http://localhost:8080/api/jobs/${id}`;
      await axios.delete(url);
    } catch (error: any) {
      console.log(error.response);
    }
  };
  return (
    <div>
      <h1>Welcome To Job Management App!!!</h1>
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Job Category</TableCell>
              <TableCell align="center">Job Title</TableCell>
              <TableCell align="center">Job Description</TableCell>
              <TableCell align="center">Job Experience</TableCell>
              <TableCell align="center">Create Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row._id}
                sx={{"&:last-child td, &:last-child th": {border: 0}}}
              >
                <TableCell component="th" scope="row">
                  {row.jobCategory}
                </TableCell>
                <TableCell align="center">{row.jobTitle}</TableCell>
                <TableCell align="center">{row.jobDescription}</TableCell>
                <TableCell align="center">{row.jobExperience}</TableCell>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">
                  {
                    <Button
                      color="warning"
                      onClick={() => {
                        onDelete(row._id);
                      }}
                    >
                      Delete
                    </Button>
                  }
                  {
                    <Link to={`/job/edit/${row._id}`}>
                      <Button color="info">Edit</Button>
                    </Link>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home;

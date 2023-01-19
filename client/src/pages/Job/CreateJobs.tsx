import {
  Alert,
  Button,
  Container,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import axios from "axios";
import {FormEvent, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {useNavigate} from "react-router-dom";

type Props = {};

const CreateJobs = (props: Props) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>();
  const [jobCategory, setJobCategory] = useState<string>("None");
  const [jobTitle, setJobTitle] = useState<string>();
  const [jobDescription, setJobDescription] = useState<string>();
  const [jobExperience, setJobExperience] = useState<number>();
  const [value, setValue] = useState<Dayjs | null>(dayjs());

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  const handleOnFinish = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body: any = {
      jobCategory: jobCategory,
      jobTitle: jobTitle,
      jobDescription: jobDescription,
      jobExperience: jobExperience,
      date: dayjs(value).format("YYYY-MM-DD"),
    };

    try {
      const url = "http://localhost:8080/api/jobs";
      await axios.post(url, body);
      navigate("/");
    } catch (error: any) {
      console.log(error.response);

      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleOnFinish}>
        <Container maxWidth="sm">
          <Grid2
            container
            spacing={2}
            direction="column"
            justifyContent="center"
            style={{minHeight: "100vh"}}
          >
            <Paper elevation={2} sx={{padding: 5}}>
              <Grid2 container direction="column" spacing={2}>
                <h1>Create New Job</h1>
                <Grid2>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Job Category
                  </InputLabel>

                  <Select
                    required
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    onChange={(e) => {
                      setJobCategory(e.target.value);
                    }}
                    fullWidth
                    label="Select Job Category"
                    defaultValue={"None"}
                  >
                    <MenuItem value="None">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Human Resource"}>Human Resource</MenuItem>
                    <MenuItem value={"Front End Developer"}>
                      Front End Developer
                    </MenuItem>
                    <MenuItem value={"Back End Developer"}>
                      Back End Developer
                    </MenuItem>
                    <MenuItem value={"Content Writer"}>Content Writer</MenuItem>
                    <MenuItem value={"Manager"}>Manager</MenuItem>
                  </Select>
                </Grid2>
                <Grid2>
                  <TextField
                    required
                    fullWidth
                    label="Enter Your Job Title"
                    placeholder="Enter Your Job Title"
                    variant="outlined"
                    onChange={(e) => {
                      setJobTitle(e.target.value);
                    }}
                  ></TextField>
                </Grid2>

                <Grid2>
                  <TextField
                    required
                    fullWidth
                    label="Enter Your Job Description"
                    placeholder="Enter Your Job Description"
                    variant="outlined"
                    onChange={(e) => {
                      setJobDescription(e.target.value);
                    }}
                  ></TextField>
                </Grid2>
                <Grid2>
                  <TextField
                    type={"number"}
                    required
                    fullWidth
                    label="Enter Experience Required"
                    placeholder="Enter Experience Required"
                    variant="outlined"
                    onChange={(e) => {
                      setJobExperience(Number(e.target.value));
                    }}
                  ></TextField>
                </Grid2>
                <Grid2>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Select Date"
                      inputFormat="MM/DD/YYYY"
                      value={value}
                      onChange={handleChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid2>

                {error && (
                  <Grid2>
                    <Alert severity="error">{error}</Alert>
                  </Grid2>
                )}
                <Grid2>
                  <Button type="submit">Create Job</Button>
                </Grid2>
              </Grid2>
            </Paper>
          </Grid2>
        </Container>
      </form>
    </div>
  );
};

export default CreateJobs;

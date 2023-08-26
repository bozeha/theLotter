import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import MainHeader from "./components/MainHeader";
import Button from "@material-ui/core/Button";
import t from "./utils/translations";
import { direction } from "./utils/enums";
import Footer from "./components/Footer";
import getConfig from "./utils/config";

import "./App.css";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function App() {
  const [todos, setTodos] = useState("");
  const [filterByStatus, setFilterByStatus] = useState("");
  const [sortByDate, setSortByDate] = useState("");
  const [currentPage, setCurrentPage] = useState(null);
  const classes = useStyles();
  const filterByStatusFunction = (todosAfterChange) => {
    if (filterByStatus && todos) {
      let filterdToDos;
      if (todosAfterChange) {
        filterdToDos = [...todosAfterChange];
      } else {
        filterdToDos = [...todos];
      }

      filterdToDos.sort((a, b) => {
        if (a.status === b.status) {
          // If status is the same, compare by dueDate
          return a.dueDate - b.dueDate;
        }

        return a.status === filterByStatus ? -1 : 1;
      });
      setTodos(filterdToDos);
    }
  };

  const sortByDateFunction = () => {
    if (sortByDate && todos) {
      let sortToDos = [...todos];
      // if (todosAfterChange) {
      //   sortToDos = [...todosAfterChange];
      // } else {
      //   sortToDos = [...todos];
      // }

      sortToDos.sort((a, b) => {
        return a.creationTime - b.creationTime;
      });
      if (sortByDate === direction.Asc) {
        setTodos(sortToDos);
      } else {
        setTodos(sortToDos.reverse());
      }
    }
  };

  const updatePage = async () => {
    callApi().then((data) => {
      setTodos(data);
    });
  };

  useEffect(() => {
    if (currentPage) {
      updatePage();
    }
  }, [currentPage]);
  useEffect(() => {
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    filterByStatusFunction();
  }, [filterByStatus]);
  useEffect(() => {
    if (sortByDate) {
      sortByDateFunction();
    }
  }, [sortByDate]);

  const changeStatus = (id) => {
    const currentTodos = [...todos];
    currentTodos.map((current) => {
      if (current.id === id) {
        current.status = current.status === "Done" ? "Active" : "Done";
      }
    });

    /// In case the status filter is empety
    if (filterByStatus) {
      filterByStatusFunction(currentTodos);
    } else {
      setTodos(currentTodos);
    }
  };
  const callApi = async () => {
    const numberPerPage = getConfig("numberInPage");
    try {
      const response = await fetch(
        `/api/todos?numberPerPage=${numberPerPage}&pageNumber=${currentPage}`
      );
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      return body;
    } catch (error) {
      console.log(`Error:::${error}`);
      return null;
    }
  };

  return (
    <div className={classes.root}>
      <MainHeader
        filterByStatus={filterByStatus}
        setFilterByStatus={setFilterByStatus}
        sortByDate={sortByDate}
        setSortByDate={setSortByDate}
      />
      <Grid container spacing={10}>
        {todos &&
          todos.map((todo) => (
            <Grid key={todo.id} item xs={10}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textPrimary"
                    gutterBottom
                  >
                    {todo.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {new Date(todo.creationTime).toLocaleDateString()}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {todo.content}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {todo.status}
                  </Typography>
                  <Button
                    onClick={() => {
                      changeStatus(todo.id);
                    }}
                    variant="contained"
                    color="primary"
                  >
                    {todo?.status === "Done"
                      ? t("changeToActive")
                      : t("changeToDone")}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
      <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;

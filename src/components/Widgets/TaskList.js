import React, { Component, Fragment, useState, useRef } from "react";
import clsx from "clsx";
import { withStyles } from "@mui/styles";
import {
  Checkbox,
  Box,
  FormControlLabel,
  List,
  ListItem,
  Snackbar,
  Avatar,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Scrollbars } from "react-custom-scrollbars";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Data
import TaskListData from "assets/Data/Tasks.json";

const styles = (theme) => ({
  checkRoot: {
    marginRight: 0,
    marginLeft: -10,
  },
  checkBox: {
    fontSize: "1.3rem",
  },
  drag: {
    width: 25,
    paddingLeft: 3,
    textAlign: "center",
    fontSize: 16,
    opacity: 0,
    transition: "all 0.3s ease-out",
    marginLeft: -18,
  },
  navList: {
    borderBottom: `1px Solid ${theme.palette.divider}`,
    transition: "all 0.3s ease-out",
    "& .content-wrap": {
      position: "relative",
      width: "calc(100% - 40px)",
    },
    "& .content-text": {
      width: "calc(100% - 130px)",
    },
    "& .task-meta": {
      width: 130,
    },
    "& .task-action": {
      position: "absolute",
      right: 0,
      opacity: 0,
    },
    "&:hover": {
      "& .icon-wrap": {
        opacity: 1,
      },
      "& .task-meta": {
        opacity: 0,
      },
      "& .task-action": {
        opacity: 1,
      },
    },
  },
  padY: {
    paddingTop: 10,
    paddingBottom: 0,
  },
  avatr: {
    fontSize: 15,
    width: 36,
    height: 36,
  },
  taskMeta: {
    transition: "all 0.3s ease-in",
  },
});

function TaskListWidget(props) {
  const { classes } = props;
  const taskListScroll = useRef();
  const [toDoListData, setToDoListData] = useState(TaskListData);
  const [updateBtn, setUpdateBtn] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [newTask, setNewTask] = useState({
    id: TaskListData.length + 1,
    taskName: "",
    deadline: new Date(),
    completed: false,
    assignedTo: "",
    deadlineColor: "primary.main",
    avatarBG: "bg-success",
  });

  function handleChange(value, data) {
    let selectedTodoIndex = toDoListData.indexOf(data);
    let self = this;
    if (newState.toDoListData[selectedTodoIndex].completed) {
      setTimeout(() => {
        setToDoListData(() => newState.toDoListData);
        setSnackbar(true);
        setSnackbarMessage("Task Completed");
      }, 1500);
    } else {
      setTimeout(() => {
        setToDoListData(() => newState.toDoListData);
      }, 1500);
    }
  }

  function getfirstcharacters(str) {
    var matches = str.match(/\b(\w)/g);
    return matches.join("");
  }

  function addNewTask() {
    if (newTask.taskName !== "" && newTask.deadline !== "") {
      setTimeout(() => {
        setSnackbar(true);
        setSnackbarMessage("New Task Added");
        setToDoListData((prev) => toDoListData.push(newTask));
        taskListScroll.scrollToBottom();
      }, 1500);
    }
    setDialog(false);
  }

  function editTask(data) {
    setUpdateBtn(true);
    setNewTask({
      ...newTask,
      id: data.id,
      taskName: data.taskName,
      deadline: data.deadline,
      completed: data.completed,
      assignedTo: data.assignedTo,
      deadlineColor: data.deadlineColor,
      avatarBG: data.avatarBG,
    });
    setDialog(true);
  }

  function deleteTask(data) {
    let selectedTodoIndex = toDoListData.indexOf(data);
    setTimeout(() => {
      setToDoListData(toDoListData.splice(selectedTodoIndex, 1));
      setSnackbar(true);
      setSnackbarMessage("Task Deleted Successfully");
    }, 1000);
  }

  function addNew() {
    setDialog(true);
    setUpdateBtn(false);
    setNewTask({
      ...newTask,
      taskName: "",
      assignedTo: "",
      deadline: new Date(),
    });
  }

  return (
    <Box position="relative" className="task-list-wrap">
      <Box
        position="absolute"
        className="add-new-btn"
        top={{ xs: "-40px", sm: "-48px" }}
        right="0"
      >
        <Button
          className={`${classes.addBtn} primary-bg-btn`}
          variant="outlined"
          color="primary"
          onClick={() => addNew()}
        >
          Add New
        </Button>
      </Box>
      <Scrollbars
        className="rct-scroll"
        autoHide
        style={{ height: "468px" }}
        ref={taskListScroll}
      >
        <List
          component="nav"
          className={clsx(`${classes.padY} container todo-list-ul`)}
        >
          {toDoListData.length > 0 ? (
            <>
              {toDoListData
                .slice(-5, toDoListData.length)
                .map((data, index) => (
                  <ListItem key={index} className={classes.navList}>
                    <div className="w-100">
                      <Box
                        display="flex"
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <Box
                          width="40px"
                          className="checkbox-wrap"
                          display="flex"
                          justifyContent="flex-start"
                          alignItems="center"
                        >
                          <Box
                            className={clsx(
                              `${classes.drag} icon-wrap fas fa-grip-vertical`
                            )}
                            component="span"
                            display="inline-block"
                            color="text.disabled"
                          ></Box>
                          <FormControlLabel
                            className={classes.checkRoot}
                            control={
                              <Checkbox
                                className={classes.checkBox}
                                icon={
                                  <Box
                                    component="span"
                                    className="far fa-check-circle"
                                  />
                                }
                                checkedIcon={
                                  <Box
                                    component="span"
                                    className="fas fa-check-circle"
                                  />
                                }
                                checked={data.completed}
                                color="primary"
                                onChange={(event) =>
                                  handleChange(event.target.checked, data)
                                }
                              />
                            }
                          />
                        </Box>
                        <Box
                          className="content-wrap"
                          display={{ xs: "block", sm: "flex" }}
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Box className="content-text">{data.taskName}</Box>
                          <Box
                            className="task-meta"
                            pl={2}
                            display="flex"
                            justifyContent="flex-end"
                            alignItems="center"
                          >
                            {data.deadline && (
                              <Box
                                color={data.deadlineColor}
                                pr={1}
                                fontSize="body1.fontSize"
                              >
                                {data.deadline}
                              </Box>
                            )}
                            <Avatar
                              className={clsx(
                                `${classes.avatr} ${data.avatarBG}`
                              )}
                            >
                              {getfirstcharacters(data.assignedTo)}
                            </Avatar>
                          </Box>
                          <Box
                            className="task-action"
                            display="flex"
                            justifyContent="flex-end"
                            alignItems="center"
                          >
                            <IconButton
                              size="small"
                              onClick={() => editTask(data)}
                            >
                              <Box
                                component="span"
                                fontSize={{ xs: 14, sm: 20 }}
                                color="primary.main"
                                className="material-icons"
                              >
                                <EditIcon fontSize="small" />
                              </Box>
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => deleteTask(data)}
                            >
                              <Box
                                component="span"
                                fontSize={{ xs: 14, sm: 20 }}
                                color="secondary.main"
                                className="material-icons-outlined"
                              >
                                <DeleteIcon fontSize="small" />
                              </Box>
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                    </div>
                  </ListItem>
                ))}
            </>
          ) : (
            <Box fontSize="h5.fontSize">List is empty</Box>
          )}
        </List>
      </Scrollbars>
    </Box>
  );
}

export default withStyles(styles)(TaskListWidget);

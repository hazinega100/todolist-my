import React, {useState} from "react";
import "./App.css";
import Todolist, {TasksType} from "./Todolist/Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm/AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export type FilterValueType = "all" | "active" | "completed"

type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
    [todolistID: string]: TasksType[]
}

function App() {
    const todolistID_1 = v1()
    const todolistID_2 = v1()
    const [todolist, setTodolist] = useState<TodolistType[]>([
        {id: todolistID_1, title: "What to learn", filter: "all"},
        {id: todolistID_2, title: "What to buy", filter: "all"},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "SQL", isDone: false},
            {id: v1(), title: "BackEnd", isDone: false},
        ],
        [todolistID_2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Phone", isDone: false},
            {id: v1(), title: "Gift", isDone: false},
            {id: v1(), title: "Milk", isDone: false},
        ]
    })
    //  FilteredTasks
    const filteredTasks = (todolistID: string, valueFilter: FilterValueType) => {
        setTodolist(todolist.map(el => el.id === todolistID ? {...el, filter: valueFilter} : el))
    }
    const getFilteredTasks = (tasks: TasksType[], filter: FilterValueType) => {
        switch (filter) {
            case "active":
                return tasks.filter(el => !el.isDone)
            case "completed":
                return tasks.filter(el => el.isDone)
            default:
                return tasks
        }
    }
    //  RemoveTask
    const removeTasks = (todolistID: string, id: string) => {
        const tasksForUpdate = tasks[todolistID]
        const updatedTasks = tasksForUpdate.filter(el => el.id !== id)
        const copyTask = {...tasks}
        copyTask[todolistID] = updatedTasks
        setTasks(copyTask)
        // setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== id)})
    }
    //  AddTask
    const addTask = (todolistID: string, inputTitle: string) => {
        const newTask = {id: v1(), title: inputTitle, isDone: false}
        // const newTasks = [newTask, ...tasks]
        // setTasks(newTasks)
        // const tasksForUpdate = tasks[todolistID]
        // const updatedTasks = [newTask, ...tasksForUpdate]
        // const copyTask = {...tasks}
        // copyTask[todolistID] = updatedTasks
        // setTasks(copyTask)
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }
    //  Add Todolist
    const addTodolist = (inputTitle: string) => {
        const newTodolist: TodolistType = {id: v1(), title: inputTitle, filter: "all"}
        setTodolist([newTodolist, ...todolist])
        setTasks({
            ...tasks,
            [newTodolist.id]: []
        })
    }
    //  Checkbox
    const changeCheckbox = (todolistID: string, taskId: string, isDone: boolean) => {
        // const tasksForUpdate = tasks[todolistID] -> берем определенный массив который хотим изменить
        // const updatedTasks = tasksForUpdate.map(el => el.id === taskId ? {...el, isDone: isDone} : el) -> изменяем его
        // const copyTask = {...tasks} -> копируем весь объект
        // copyTask[todolistID] = updatedTasks -> изменяем копию определенного массива
        // setTasks(copyTask)
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, isDone: isDone} : el)})
    }
    const removeTodolist = (todolistID: string) => {
        setTodolist(todolist.filter(el => el.id !== todolistID))
        delete tasks[todolistID]
    }
    const onChangeValueTask = (todolistID: string, taskId: string, value: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, title: value} : el)})
    }
    const onChangeTodolistTitle = (todolistID: string, value: string) => {
        setTodolist(todolist.map(el => el.id === todolistID ? {...el, title: value} : el))
    }
    return (
        <div className="App">
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Todolist - Beta Version
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container fixed>
                <Grid container style={{margin: "20px 0 20px 0"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {
                        todolist.map(el => {
                            const filteredTask = getFilteredTasks(tasks[el.id], el.filter)
                            return (
                                <Grid item>
                                    <Paper elevation={2} style={{padding: "20px"}}>
                                        <Todolist key={el.id}
                                                  todolistID={el.id}
                                                  titleValue={el.title}
                                                  tasks={filteredTask}
                                                  filteredTasks={filteredTasks}
                                                  removeTasks={removeTasks}
                                                  addTask={addTask}
                                                  changeCheckbox={changeCheckbox}
                                                  filter={el.filter}
                                                  removeTodolist={removeTodolist}
                                                  onChangeValueTask={onChangeValueTask}
                                                  onChangeTodolistTitle={onChangeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;

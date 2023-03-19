import React, {ChangeEvent} from "react";
import {FilterValueType} from "../App";
import AddItemForm from "../AddItemForm/AddItemForm";
import EditableSpan from "../EditableSpan/EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

type TodolistPropsType = {
    todolistID: string
    titleValue: string
    tasks: TasksType[]
    filteredTasks: (todoID: string, value: FilterValueType) => void
    removeTasks: (todolistID: string, id: string) => void
    addTask: (todolistID: string, inputTitle: string) => void
    changeCheckbox: (todolistID: string, taskId: string, isDone: boolean) => void
    filter: FilterValueType
    removeTodolist: (todolistID: string) => void
    onChangeTodolistTitle: (todolistID: string, value: string) => void
    onChangeValueTask: (todolistID: string, taskId: string, value: string) => void
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

const Todolist = (props: TodolistPropsType) => {

    const setAll = () => {
        props.filteredTasks(props.todolistID, "all")
    }
    const setActive = () => {
        props.filteredTasks(props.todolistID, "active")
    }
    const setCompleted = () => {
        props.filteredTasks(props.todolistID, "completed")
    }
    const addTask = (inputTitle: string) => {
        props.addTask(props.todolistID, inputTitle)
    }
    const onChangeTodolistTitleHandler = (value: string) => {
        props.onChangeTodolistTitle(props.todolistID, value)
    }
    return (
        <div>
            <h3>
                <EditableSpan title={props.titleValue} onChange={onChangeTodolistTitleHandler}/>
                {/*<button onClick={ () => {props.removeTodolist(props.todolistID)} }>x</button>*/}
                <IconButton onClick={() => {
                    props.removeTodolist(props.todolistID)
                }} color={"error"}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map(task => {
                    const removeTask = () => props.removeTasks(props.todolistID, task.id)
                    const changeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeCheckbox(props.todolistID, task.id, e.currentTarget.checked)
                    }
                    const onChangeValue = (newValue: string) => {
                        props.onChangeValueTask(props.todolistID, task.id, newValue)
                    }
                    return <li style={{listStyle: "none"}} key={task.id} className={task.isDone ? "is-done" : ""}>
                        <Checkbox onChange={changeCheckbox}
                                  checked={task.isDone}
                        />
                        <EditableSpan title={task.title}
                                      onChange={onChangeValue}
                        />
                        {/*<button onClick={removeTask}>x</button>*/}
                        <IconButton onClick={removeTask}>
                            <Delete/>
                        </IconButton>
                    </li>
                })}
            </ul>
            <div>
                <Button variant={props.filter === "all" ? "outlined" : "text"} onClick={setAll}>All</Button>
                <Button color={"error"} variant={props.filter === "active" ? "outlined" : "text"}
                        onClick={setActive}>Active</Button>
                <Button color={"success"} variant={props.filter === "completed" ? "outlined" : "text"}
                        onClick={setCompleted}>Completed</Button>
            </div>
        </div>
    );
};

export default Todolist;
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField, Tooltip} from "@mui/material";
import {AddCircle} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (inputTitle: string) => void
}

const AddItemForm = (props: AddItemFormPropsType) => {
    const [inputTitle, setInputTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const onChangInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.currentTarget.value)
        setError(null)
    }
    const addTask = () => {
        if (inputTitle.trim() !== "") {
            props.addItem(inputTitle.trim())
            setInputTitle("")
        } else {
            setError("Title is required")
            setInputTitle("")
        }
    }
    const onKeyDownInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }
    return (
        <div>
            <TextField onChange={onChangInputHandler}
                       onKeyDown={onKeyDownInputHandler}
                       value={inputTitle}
                       error={!!error}
                       label={"Add task"}
                       helperText={error}
            />
            {/*<Button onClick={addTask}>+</Button>*/}
            <Tooltip title="Add">
                <IconButton onClick={addTask} color={"success"}>
                    <AddCircle/>
                </IconButton>
            </Tooltip>
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    );
};

export default AddItemForm;
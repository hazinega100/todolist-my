import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState("")

    const activeEditeMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activeViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    return (editMode
            ? <TextField onChange={onChangeTitleHandler}
                         onBlur={activeViewMode}
                         value={title}
                         autoFocus
                         variant={"standard"}
            />
            : <span onDoubleClick={activeEditeMode}>{props.title}</span>
    );
};

export default EditableSpan;
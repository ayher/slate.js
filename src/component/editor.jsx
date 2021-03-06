import React, { useCallback, useRef, memo } from 'react'
import { Slate, Editable, ReactEditor } from 'slate-react'
import { css } from 'emotion'
import { Element } from '../lib/element'
import { renderLeaf } from '../lib/leaf'
import { useDispatch } from 'redux-react-hook'
import { changeEditorValueAction } from '../store/action'
const Editor = ({pageIndex, editor, value, isFocused}) => {
    let el = useRef(null)
    const dispatch = useDispatch()
    const renderElement = useCallback(props =>  <Element editor={editor} {...props} />, [])
    const changeVal = useCallback(val => {
        const action = changeEditorValueAction(editor, pageIndex, val, ReactEditor.isFocused(editor))
        dispatch(action)
    }, [pageIndex])
    return (
        <div
            ref={el}
            className={css`
                width: 716px;
                box-sizing: border-box;
                transition: all 0.1s;
                margin: 5px 0;
                padding: 5px;
                box-shadow: ${isFocused ? '0 0 0 1px #bee1c7' : 'none'};
            `}
        >
            <Slate
                editor={editor}
                value={value}
                onChange={changeVal}
            >
                <Editable
                    // placeholder="Edit here"
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                />
            </Slate>
        </div>
    )
}

export default memo(Editor)
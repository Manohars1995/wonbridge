import React, { useReducer, useEffect } from "react";
import type { ChangeEvent, FocusEvent } from "react";
import { MdOutlineEdit } from "react-icons/md";

import { validate } from "@/shared/util/validators";
import type { Validator } from "@/shared/util/validators";

type InputProps = {
  id: string;
  label: string;
  element?: "input" | "textarea";
  type?: string;
  placeholder?: string;
  rows?: number;
  errorText?: string;
  validators?: Validator[];
  onInput: (id: string, value: string, isValid: boolean) => void;
  initialValue?: string;
  initialValid?: boolean;
};

type InputState = {
  value: string;
  isTouched: boolean;
  isValid: boolean;
};

type Action =
  | { type: "CHANGE"; val: string; validators?: Validator[] }
  | { type: "TOUCH" };

const inputReducer = (state: InputState, action: Action): InputState => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators || [])
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true
      };
    default:
      return state;
  }
};

const Input = (props: InputProps) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialValid || false
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators
    });
  };

  const touchHandler = (
    _event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({ type: "TOUCH" });
  };

  let element;

  if (props.type === "image") {
    element = (
      <div className="relative bg-[#ccc] h-[8rem] w-[8rem] rounded-full self-center shadow-lg flex items-center justify-center">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id={props.id}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
              dispatch({
                type: "CHANGE",
                val: file.name,
                validators: props.validators
              });
            }
          }}
          onBlur={touchHandler}
        />
        <label
          htmlFor={props.id}
          className="absolute h-[2rem] w-[2rem] border bottom-2 right-1 bg-white p-1 rounded-full shadow cursor-pointer flex items-center justify-center"
        >
          <MdOutlineEdit />
        </label>
      </div>
    );
  } else {
    element =
      props.element === "input" ? (
        <input
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
        />
      ) : (
        <textarea
          id={props.id}
          rows={props.rows || 3}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
        />
      );
  }

  return (
    <div
      className={`my-2 w-full flex flex-col items-center p-2 ${
        !inputState.isValid && inputState.isTouched ? "text-red-600" : ""
      }`}
    >
      <label
        className={`w-full font-bold mb-2 text-left ${
          !inputState.isValid && inputState.isTouched ? "text-red-600" : ""
        }`}
        htmlFor={props.id}
      >
        {props.label}
      </label>

      {/* Render with conditional class unless image type */}
      {props.type !== "image"
        ? React.cloneElement(element, {
            className: `w-full font-inherit border border-gray-300 bg-gray-100 px-1 py-[0.15rem] 
            focus:outline-none focus:bg-[#ebebeb] focus:border-purple-800 rounded-lg px-2
            ${
              !inputState.isValid && inputState.isTouched
                ? "border-red-500 bg-red-200"
                : ""
            }`
          })
        : element}

      {!inputState.isValid && inputState.isTouched && (
        <p className="text-red-600 text-left w-full pl-2 text-xs">
          {props.errorText}
        </p>
      )}
    </div>
  );
};

export default Input;

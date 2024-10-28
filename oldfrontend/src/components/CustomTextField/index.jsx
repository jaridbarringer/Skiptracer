import React from "react";
import { Stack, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import styles from "./styles";

const CustomTextField = (props) => {
  const {
    name,
    label,
    placeholder,
    rules,
    control,
    helperText,
    type,
    size,
    defaultValue,
    fullWidth,
    minRows,
    multiline,
    InputProps,
    variant,
    sx,
    disabled,
    onMouseLeave,
    onMouseEnter,
    autoComplete,
    value,
    onChange,
    isHookForm,
    errors,
  } = props;

  const mergedSx = {
    ...styles.inputField,
    ...sx,
  };
  const defaultInputProps = {
    disableUnderline: true,
    ...InputProps,
  };

  return (
    <React.Fragment>
      {isHookForm ? (
        <Stack>
          <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => (
              <TextField
                {...field}
                id={name}
                error
                name={name}
                variant={variant}
                sx={mergedSx}
                value={field.value}
                onChange={field.onChange}
                label={label}
                placeholder={placeholder}
                type={type}
                size={size}
                defaultValue={defaultValue}
                fullWidth={fullWidth}
                multiline={multiline}
                minRows={minRows}
                InputProps={defaultInputProps}
                disabled={disabled}
                onMouseLeave={onMouseLeave}
                onMouseEnter={onMouseEnter}
                autoComplete={autoComplete}
              />
            )}
          />

          {helperText && (
            <Stack pt={1}>
              <Typography variant="caption" sx={{ color: "red" }}>
                {helperText}
              </Typography>
            </Stack>
          )}
        </Stack>
      ) : (
        <Stack>
          <TextField
            error
            name={name}
            variant={variant}
            sx={mergedSx}
            value={value}
            onChange={onChange}
            label={label}
            placeholder={placeholder}
            type={type}
            size={size}
            defaultValue={defaultValue}
            fullWidth={fullWidth}
            multiline={multiline}
            minRows={minRows}
            InputProps={defaultInputProps}
            disabled={disabled}
            onMouseLeave={onMouseLeave}
            onMouseEnter={onMouseEnter}
            autoComplete={autoComplete}
          />

          <Typography variant="caption" sx={{ color: "red" }}>
            {helperText}
          </Typography>
        </Stack>
      )}
    </React.Fragment>
  );
};

export default CustomTextField;

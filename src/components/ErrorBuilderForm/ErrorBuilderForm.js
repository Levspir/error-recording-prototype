import React from "react";
import { Form, Field } from "react-final-form";
import { TextField, Radio } from "final-form-material-ui";
import {
  Paper,
  Grid,
  Button,
  RadioGroup,
  FormLabel,
  FormControl,
  FormControlLabel
} from "@material-ui/core";

const ErrorBuilderFrom = props => {
  let initialValues;
  if (props.data) {
    const { shortDescription, description, priority, severity } = props.data;
    initialValues = {
      shortDescription,
      description,
      priority,
      severity
    };
  }
  const values = props.data
    ? initialValues
    : { priority: "LOW", severity: "MINOR" };
  return (
    <Form
      onSubmit={props.submit}
      initialValues={values}
      validate={props.validate}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <Paper style={{ padding: 16 }}>
            <Grid container alignItems="flex-start" spacing={8}>
              <Grid item xs={12}>
                <FormLabel component="legend">Short description</FormLabel>
                <Field
                  name="shortDescription"
                  fullWidth
                  required
                  component={TextField}
                  margin="dense"
                  type="text"
                  placeholder="Short Description"
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel component="legend">Description</FormLabel>
                <Field
                  name="description"
                  fullWidth
                  required
                  multiline
                  margin="dense"
                  component={TextField}
                  type="text"
                  placeholder="Decription"
                />
              </Grid>
              <Grid item>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Priority</FormLabel>
                  <RadioGroup row>
                    <FormControlLabel
                      label="Veri hight"
                      control={
                        <Field
                          name="priority"
                          component={Radio}
                          type="radio"
                          value="VERY_HIGHT"
                        />
                      }
                    />
                    <FormControlLabel
                      label="Hight"
                      control={
                        <Field
                          name="priority"
                          component={Radio}
                          type="radio"
                          value="HIGHT"
                        />
                      }
                    />
                    <FormControlLabel
                      label="Middle"
                      control={
                        <Field
                          name="priority"
                          component={Radio}
                          type="radio"
                          value="MIDDLE"
                        />
                      }
                    />
                    <FormControlLabel
                      label="Low"
                      control={
                        <Field
                          name="priority"
                          component={Radio}
                          type="radio"
                          value="LOW"
                        />
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Severity</FormLabel>
                  <RadioGroup>
                    <FormControlLabel
                      label="Critical"
                      control={
                        <Field
                          name="severity"
                          component={Radio}
                          type="radio"
                          value="CRITICAL"
                        />
                      }
                    />
                    <FormControlLabel
                      label="Significant"
                      control={
                        <Field
                          name="severity"
                          component={Radio}
                          type="radio"
                          value="SIGNIFICANT"
                        />
                      }
                    />
                    <FormControlLabel
                      label="Minor"
                      control={
                        <Field
                          name="severity"
                          component={Radio}
                          type="radio"
                          value="MINOR"
                        />
                      }
                    />
                    <FormControlLabel
                      label="Request for Change"
                      control={
                        <Field
                          name="severity"
                          component={Radio}
                          type="radio"
                          value="REQUEST_FOR_CHANGE"
                        />
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item style={{ marginTop: 16 }}>
                <Button
                  type="button"
                  variant="contained"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Clear
                </Button>
              </Grid>
              <Grid item alignItems="right" style={{ marginTop: 16 }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={submitting}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
      )}
    />
  );
};

export default ErrorBuilderFrom;

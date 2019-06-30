import React from "react";
import { Form, Field } from "react-final-form";
import { TextField } from "final-form-material-ui";
import Container from "@material-ui/core/Container";

import { Paper, Grid, Button, FormLabel } from "@material-ui/core";

const UpdateUserForm = props => {
  let initialValues;
  if (props.data) {
    const { name, surName } = props.data;
    initialValues = {
      name,
      surName
    };
  }
  const values = props.data ? initialValues : {};
  return (
    <Container maxWidth="xs">
      <Form
        onSubmit={props.submit}
        initialValues={values}
        validate={props.validate}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={8}>
                <Grid item xs={12}>
                  <FormLabel component="legend">Name</FormLabel>
                  <Field
                    name="name"
                    fullWidth
                    required
                    component={TextField}
                    margin="dense"
                    type="text"
                    placeholder="Name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormLabel component="legend">Surname</FormLabel>
                  <Field
                    name="surName"
                    fullWidth
                    required
                    multiline
                    margin="dense"
                    component={TextField}
                    type="text"
                    placeholder="Surname"
                  />
                </Grid>

                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={form.reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </Button>
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    Update
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </form>
        )}
      />
    </Container>
  );
};

export default UpdateUserForm;

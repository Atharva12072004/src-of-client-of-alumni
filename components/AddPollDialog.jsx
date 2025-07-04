import React from "react";
import {
  Dialog,
  DialogTitle,
  Button,
  TextField,
  Stack,
  Typography,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { toast } from "react-toastify";
import { fetcherPost } from "../utils/axiosAPI";
import { FieldArray, Form, Formik } from "formik";
import * as yup from "yup";

const AddPollDialog = ({ open, onClose, user, refreshPollData }) => {
  const validationSchema = yup.object().shape({
    title: yup.string().required("Required"),
    pollOptions: yup
      .array()
      .of(yup.string().required("Cannot be empty"))
      .min(2, "Minimum 2 options are required")
      .required("Options are required"),
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ style: { width: "450px" } }}
    >
      <DialogTitle>Add Poll</DialogTitle>
      <div className="pt-3 pb-2 px-6">
        <Formik
          initialValues={{
            title: "",
            pollOptions: ["", ""],
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            const optArr = values.pollOptions?.map((option) => {
              return { optionTitle: option };
            })
            const body = {
              floatedBy: user?.basic?.name,
              floatedByID: user?.basic?.id,
              title: values.title,
              options: optArr
            }
            try {
              const res = await fetcherPost("/poll/create", { body });
              if(res?.msg) toast.success(res.msg);
              refreshPollData();
              onClose();
            } catch (err) {
              console.log(err);
            }
          }}
        >
          {({
            values,
            touched,
            errors,
            handleChange,
            isSubmitting,
            handleSubmit,
          }) => (
            <Form>
              <Stack spacing={2}>
                <TextField
                  name="title"
                  label="Poll Title"
                  placeholder="Enter title for your poll"
                  value={values.title}
                  onChange={handleChange}
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                />
                <Typography variant="body1">
                  Add Options (Minimum: 2 and Maximum: 10)
                </Typography>
                <FieldArray name="pollOptions">
                  {({ push, remove }) => (
                    <Stack spacing={1.5}>
                      {values?.pollOptions?.map((option, index) => (
                        <Stack
                          key={index}
                          spacing={2}
                          direction={"row"}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                        >
                          <TextField
                            key={index}
                            name={`pollOptions.${index}`}
                            label={`Option ${index + 1}`}
                            placeholder={`Enter option ${index + 1}`}
                            value={values.pollOptions[index]}
                            onChange={handleChange}
                            fullWidth
                            error={
                              touched.pollOptions &&
                              touched.pollOptions[index] &&
                              errors.pollOptions &&
                              errors.pollOptions[index] &&
                              Boolean(errors.pollOptions[index])
                            }
                            helperText={
                              touched.pollOptions &&
                              touched.pollOptions[index] &&
                              errors.pollOptions &&
                              errors.pollOptions[index] !== "M" &&
                              errors.pollOptions[index]
                            }
                          />
                          <IconButton onClick={() => remove(index)}>
                            <Delete color="error" />
                          </IconButton>
                        </Stack>
                      ))}
                      {values.pollOptions?.length < 10 && (
                        <Button
                          onClick={() => push("")}
                          variant="outlined"
                          disabled={isSubmitting}
                        >
                          Add Option
                        </Button>
                      )}
                    </Stack>
                  )}
                </FieldArray>
                <FormHelperText error>
                  {touched.pollOptions &&
                    typeof errors.pollOptions === "string" &&
                    errors.pollOptions}
                </FormHelperText>
              </Stack>
              <Stack
                width={"100%"}
                justifyContent={"space-between"}
                alignItems={"center"}
                direction={"row"}
                spacing={2}
                sx={{ padding: "1em" }}
              >
                <Button
                  onClick={onClose}
                  color="secondary"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Add Poll
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
};

export default AddPollDialog;

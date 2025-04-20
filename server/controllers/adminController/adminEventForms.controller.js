import EventRequestForm from "../../models/EventRequestForm.js";

// fetch all forms
export const getAllForms = async (req, res) => {
  try {
    const forms = await EventRequestForm.find();
    res.status(200).json({ data: forms, status: true });
  } catch (error) {
    res.status(404).json({ message: error.message, status: false });
  }
};
// fetch a form
export const getForm = async (req, res) => {
  try {
    const form = await EventRequestForm.findById(req.params.id);
    res.status(200).json({ data: form, status: true });
  } catch (error) {
    res.status(404).json({ message: error.message, status: false });
  }
};
// update a form
export const updateForm = async (req, res) => {
  try {
    const {  status } = req.body;
    if (!status) {
      return res
        .status(400)
        .json({ message: "Status is required", status: false });
    }

    const form = await EventRequestForm.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!form) {
      return res.status(404).json({ message: "Form not found", status: false });
    }

    res.status(200).json({ data: form, status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
};

// delete a form
export const deleteForm = async (req, res) => {
  try {
    await EventRequestForm.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: "Form deleted successfully", status: true });
  } catch (error) {
    res.status(404).json({ message: error.message, status: false });
  }
};

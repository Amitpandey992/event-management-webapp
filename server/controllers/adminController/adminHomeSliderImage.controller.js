import homeSliderImageModel from "../../models/homeSliderImage.model.js";

import ImageKit from "imagekit";
var imagekit = new ImageKit({
  publicKey: "public_E1gulLPW2Y+GnhfOY2fgVpa5E4c=",
  privateKey: "private_lPOr94BnX/3oSsvad3chDX27EXA=",
  urlEndpoint: "https://ik.imagekit.io/fhbne9pox/",
});

export const homeSliderImage = async (req, res) => {
  try {
    const galleryPhotos = await homeSliderImageModel.find({});
    res.status(200).json({ data: galleryPhotos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const uploadHomeSliderImage = async (req, res) => {
  // console.log(req.files);
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "Please provide an image" });
    }
    const image = req.files.image;

    if (!image) {
      return res.status(400).json({ message: "Please provide the image" });
    }
    const { fileId, url } = await imagekit.upload({
      file: image.data,
      fileName: image.name,
    });
    const newSilderImage = await homeSliderImageModel.create({
      image: { fileId, url },
    });
    res.status(200).json({
      data: newSilderImage,
      message: "Slider photo uploaded successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteHomeSliderImage = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Please provide a valid id" });
    }
    const galleryPhoto = await homeSliderImageModel.findById(id);
    if (!galleryPhoto) {
      return res.status(404).json({ message: "Gallery photo not found" });
    }

    if (galleryPhoto.image.fileId) {
      await imagekit.deleteFile(galleryPhoto.image.fileId);
    }
    await homeSliderImageModel.findByIdAndDelete(galleryPhoto._id);
    res.status(200).json({ message: "Slider photo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

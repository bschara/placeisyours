module.exports = (mongoose) => {
  const Users = mongoose.Schema(
    {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
      },
      address: [
        {
          city: {
            type: String,
            required: true,
          },
          street: {
            type: String,
            required: true,
          },
          building: {
            type: String,
            required: true,
          },
        },
      ],
    },
    { timestamps: true }
  );

  Users.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("User", Users);
  return User;
};

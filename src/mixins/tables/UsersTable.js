export default {
  data() {
    return {
      columns: [
        {
          name: "id",
          required: true,
          label: "id",
          align: "left",
          field: "id",
          sortable: true,
        },
        {
          name: "username",
          align: "left",
          label: "Username",
          field: "username",
          sortable: true,
        },
        {
          name: "email",
          align: "left",
          label: "Email",
          field: "username",
          sortable: true,
        },
        {
          name: "role",
          align: "left",
          label: "Role",
          field: "role",
          sortable: true,
        },
        {
          name: "registered",
          label: "Registered at",
          field: "registered",
          sortable: true,
        },
        {
          name: "last_login",
          label: "Last login",
          field: "last_login",
          sortable: true,
        },
        {
          name: "actions",
          label: "Actions",
          field: "actions",
        },
      ],
    };
  },
};

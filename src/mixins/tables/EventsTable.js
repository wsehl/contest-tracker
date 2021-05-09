import { format } from "date-fns";

export default {
  data() {
    return {
      columns: [
        {
          name: "id",
          required: true,
          label: "#",
          field: "id",
          sortable: true,
          align: "left",
        },
        {
          name: "event_title",
          label: "Event",
          field: "event_title",
          sortable: true,
          align: "left",
        },
        {
          name: "organization_name",
          label: "Organization",
          field: "organization_name",
          sortable: true,
          align: "left",
        },
        {
          name: "Date",
          label: "Date",
          field: (row) => row.start_date + " " + row.end_date,
          format: (val, row) =>
            `${this.formatDate(row.start_date)} - ${this.formatDate(
              row.end_date
            )}`,
          align: "left",
        },
      ],
    };
  },
  methods: {
    formatDate(d) {
      return format(new Date(d), "PP");
    },
  },
};

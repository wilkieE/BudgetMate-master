export const requestForms = {
  forms: [
    //  Budget Line selection screen
    {
      screenName: "Budget Line",
      options: {
        Project: [
          { code: null, name: "Enter manually" },
          { code: "P1", name: "Project 1" },
          { code: "P2", name: "Project 2" },
          { code: "P3", name: "Project 3" },
        ],
        fund: [
          { code: null, name: "Enter manually" },
          { code: "F1", name: "Fund 1" },
          { code: "F2", name: "Fund 2" },
          { code: "F3", name: "Fund 3" },
        ],
        chapter: [
          { code: "0", name: "No Chapter" },
          { code: "1", name: "Chapter 1" },
          { code: "2", name: "Chapter 2" },
        ],
        part: [
          { code: "0", name: "No Part" },
          { code: "1", name: "Part 1" },
          { code: "2", name: "Part 2" },
        ],
        type: [
          { code: "0", name: "No Type" },
          { code: "1", name: "Type 1" },
          { code: "2", name: "Type 2" },
          { code: "3", name: "Type 3" },
          { code: "4", name: "Type 4" },
          { code: "5", name: "Type 5" },
          { code: "6", name: "Type 6" },
          { code: "7", name: "Type 7" },
          { code: "8", name: "Type 8" },
          { code: "9", name: "Type 9" },
        ],
        item: [
          { code: "0", name: "No Item" },
          { code: "1", name: "Item 1" },
          { code: "2", name: "Item 2" },
          { code: "3", name: "Item 3" },
          { code: "4", name: "Item 4" },
          { code: "5", name: "Item 5" },
          { code: "6", name: "Item 6" },
          { code: "7", name: "Item 7" },
          { code: "8", name: "Item 8" },
        ],
      },
    },
    {
      screenName: "Fiscal Quarter",
      options: {
        Year: [
          { code: "2023", name: "2023" },
          { code: "2024", name: "2024" },
          { code: "2025", name: "2045" },
        ],
        Quarter: [
          { code: "-Q1", name: "Quarter 1" },
          { code: "-Q2", name: "Quarter 2" },
          { code: "-Q3", name: "Quarter 3" },
          { code: "-Q4", name: "Quarter 4" },
        ],
      },
    },
    {
      // Commitment description screen
      screenName: "Commitment Description",
      options: {
        label: "Please enter a description of the commitment",
        placeholder: "Description",
        maxLength: 100,
        type: "text",
      },
    },
    {
      // Enter Amount screen
      screenName: "Commitment Amount",
      options: {
        label: "Enter commitment amount",
        placeholder: "Enter Amount",
        maxLength: 100,
        type: "text",
      },
    },
    {
      // "Specify Continuing Payment screen
      screenName: "Is this a Continuing Payment?",
      options: {
        isContinuingPayment: [
          { code: "Yes", name: "Yes" },
          { code: "No", name: "No" },
        ],
      },
    },
    {
      // Enter Allotment Amount screen
      screenName: "Allotment Amount",
      options: {
        label: "Enter Allotment Amount",
        placeholder: "Enter Amount",
        maxLength: 100,
        type: "text",
      },
    },
    {
      // Expected Payment Date screen
      screenName: "Expected Payment Date",
      options: {
        paymentDate: {
          label: "Expected Payment Date",
          type: "date",
          value: "",
          required: true,
        },
      },
    },
  ],
};

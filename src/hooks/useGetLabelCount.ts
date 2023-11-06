import mockedContacts from "__mocks__/mockedContacts.json";
import mockedLabels from "__mocks__/mockedLabels.json";
import getNotification from "utils/getNotificaton";

export default function useGetLabelCount() {
  // Create a map to store label counts
  const labelCounts = new Map();

  // Initialize label counts with 0 for each label
  mockedLabels.forEach((label) => {
    labelCounts.set(label.labelName, 0);
  });

  // Count the number of times each label appears in contacts
  mockedContacts.forEach((contact) => {
    contact.labels.forEach((label) => {
      const labelName = label.labelName.toLowerCase(); // Convert to lowercase to handle case-insensitive matching
      if (labelCounts.has(labelName)) {
        labelCounts.set(labelName, labelCounts.get(labelName) + 1);
      }
    });
  });

  // Convert the label counts map into an array of objects
  const labelCountsArray = Array.from(labelCounts, ([label, count]) => ({
    label,
    count,
  }));

  const labelComponentsArray = labelCountsArray.map((labelCount) => ({
    label: labelCount.label,
    component: getNotification(labelCount.count),
  }));

  return labelComponentsArray;
}

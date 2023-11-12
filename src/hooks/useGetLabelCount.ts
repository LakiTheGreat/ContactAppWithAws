import { Label, SingleContact } from "types";
interface Props {
  contacts: SingleContact[] | undefined;
  labels: Label[] | undefined;
}

export default function useGetLabelCount({ contacts, labels }: Props) {
  if (!contacts || !labels) {
    return null;
  }
  // Create a map to store label counts
  const labelCounts = new Map();
  // Initialize label counts with 0 for each label
  labels.forEach((label) => {
    labelCounts.set(label.labelId, 0);
  });
  // Count the number of times each label appears in contacts
  contacts.forEach((contact) => {
    contact.labels.forEach((label) => {
      if (labelCounts.has(label)) {
        labelCounts.set(label, labelCounts.get(label) + 1);
      }
    });
  });
  //   // Convert the label counts map into an array of objects
  const labelCountsArray = Array.from(labelCounts, ([label, count]) => ({
    label,
    count,
  }));

  const matchLabels = () => {
    // Create a map for faster lookups
    const labelMap = new Map();

    // Populate the map with labelId and labelName from array1
    labels.forEach(({ labelId, labelName }) => {
      labelMap.set(labelId, labelName);
    });

    // Result array to store matched objects
    const resultArray: any = [];

    // Iterate through array2 and check for matching labelId
    labelCountsArray.forEach(({ label, count }) => {
      if (labelMap.has(label)) {
        // Found a match, add the labelName and count to the result array
        resultArray.push({
          labelId: label,
          labelName: labelMap.get(label),
          count: count,
        });
      }
    });

    return resultArray;
  };

  const matchedLabels = matchLabels();
  return matchedLabels;

  //   const labelComponentsArray = labelCountsArray.map((labelCount) => ({
  //     label: labelCount.label,
  //     component: getNotification(labelCount.count),
  //   }));
  //   return labelComponentsArray;
}

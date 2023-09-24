export function removeFirstOccurrence(value: string, array: string[]) {
  "use client"
  const index = array.indexOf(value);
  if (index !== -1) {
    array.splice(index, 1);
  }
  return array;
}

export function removeAndReturnFirstH1Contents(htmlString: string) {
  "use client"
  // Create a temporary div element to parse the HTML string
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;

  // Find the first <h1> element
  const firstH1 = tempDiv.querySelector('h1');

  if (firstH1) {
    // Get the contents of the <h1> element
    const contents = firstH1.innerHTML;

    // Remove the <h1> element from the temporary div
    firstH1.parentNode?.removeChild(firstH1);

    const updatedHtml = tempDiv.innerHTML;

    // Return both the contents and updated HTML
    return {
      h1: contents,
      updatedHtml: updatedHtml,
    };
  } else {
    // If no <h1> element is found, return null for both values
    return {
      h1: null,
      updatedHtml: htmlString, // Return the original HTML
    };
  }
}

export function removeFileExtension(filename: string) {
  // Use a regular expression to match and remove the file extension
  return filename.replace(/\.[^/.]+$/, "");
}

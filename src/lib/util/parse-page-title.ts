export default function parsePageTitle(content: string) {
  try {
    const parsedInput = JSON.parse(content);
    
    if (parsedInput.type === "doc" && Array.isArray(parsedInput.content)) {
      const headingNode = parsedInput.content.find((node: { type: string; }) => node.type === "heading");
      
      if (headingNode && headingNode.content && Array.isArray(headingNode.content)) {
        const textNode = headingNode.content.find((node: { type: string; }) => node.type === "text");
        
        if (textNode && textNode.text) {
          return textNode.text;
        }
      }
    }
    
    return "untitled";
  } catch (error) {
    return "Error parsing JSON";
  }
}
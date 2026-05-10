function headingCreator(text, level) {
    const heading = document.createElement(`h${level}`);
    
    heading.textContent = text;
    
    document.body.appendChild(heading);
}
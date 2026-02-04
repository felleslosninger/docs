// Adding [TABS] for request / response / curl examples (instead of listing them after each other)
//
// works by adding a bar of tabs at the top of each section of class "sect3"
// the bar contains buttons for each example in that section (listingblock and/or openblock)
// it adds event listener to the "tabs" (buttons) to toggle visibility by adding/removing the "active" style class
// styling for this can be found in the "magic-tabs.css" file
//
document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('.sect3').forEach(section => {

        // grab all listingblocks and openblocks inside sect3
        const blocks = section.querySelectorAll('.listingblock, .openblock')
        if (blocks.length === 0) return;

        // create the tab bar and set the style
        const tabs = document.createElement('div');
        tabs.className = 'tab-headers';

        blocks.forEach((block, i) => {
            const titleDiv = block.querySelector('.title');
            const title = titleDiv ?.textContent.trim() || `Tab ${i+1}`;
            const btn = document.createElement('button');
            btn.className = 'tab-header';
            btn.textContent = title;
            titleDiv.style.display = 'none'; // hide the title div (since tab has the same name as the title)

            btn.addEventListener('click', () => {
                section.querySelectorAll('.tab-header').forEach(b => b.classList.remove('active'));
                blocks.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                block.classList.add('active');
            });

            if (i === 0) {
                btn.classList.add('active');
                block.classList.add('active');
            }

            tabs.appendChild(btn);
        });

        // insert tabs after H4
        const h4 = section.querySelector('h4');
        h4.insertAdjacentElement('afterend', tabs);
    });

});

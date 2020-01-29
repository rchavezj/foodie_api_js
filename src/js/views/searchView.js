import { elements } from './base';

/****************  Functions we export inside index.js ******************/
export const getInput = () => elements.searchInput.value;
export const clearInput = () => { elements.searchInput.value = ''; }
export const clearResult = () => { 
    elements.searchResList.innerHTML = ''; 
    elements.searchResPages.innerHTML = ''; 
}

export const renderResults = (recipes, page=1, resPerPage=10) => { 
    // Render results of current page
    const start = (page - 1) * resPerPage; 
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe); 

    // Render pagination buttons
    renderButtons(page, recipes.length, resPerPage)
};

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));

    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });

    document.querySelector(`.results__link[href*="#${id}"]`).classList.add('results__link--active');
};

/*
//  acc: accumulator 
//  cur: current word
// 'Pasta with tomato and spinach'
    acc: 0  | acc + cur.length(5) = 5   | newTitle = ['Pasta']
    acc: 5  | acc + cur.length(4) = 9   | newTitle = ['Pasta', 'with']
    acc: 9  | acc + cur.length(6) = 15  | newTitle = ['Pasta', 'with', 'tomato']
    acc: 15 | acc + cur.length(3) = 18  | newTitle = ['Pasta', 'with', 'tomato', 'and']
    acc: 18 | acc + cur.length(7) = 24  | newTitle = ['Pasta', 'with', 'tomato', 'and', 'spinach']
*/
export const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            } return acc + cur.length;  // New acc callback
        }, 0);
        return `${newTitle.join(' ')} ...`;
    } return title;
};
/****************  Functions we export inside index.js ******************/












// type: 'prev' or 'next'
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page - 1 : page + 1}">
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
    let button;
    const pages = Math.ceil(numResults / resPerPage);
    
    // Only button to go to next page
    if(page === 1 && pages > 1){
        button = createButton(page, 'next');
    }
    
    // Both buttons
    else if (page < pages){
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    }
    
    // Only button to go to prev page
    else if (page === pages && pages > 1) {
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
            <img src="${recipe.image_url}" alt="Test">
                    </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
                </a>
        </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};
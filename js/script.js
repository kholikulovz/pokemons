const elForm = selectElem('.wrapper__form');
const elSelect = selectElem('#wrapper__select', elForm);
const elSearch = selectElem('#wrapper__search', elForm);
const elFilter = selectElem('#wrapper__filter', elForm);
const elFormBtn = selectElem('#wrapper__button', elForm);
const elMenu = selectElem('.cards__menu');
const elTemplate = selectElem('#template').content;
// const ModalTemplate = selectElem('#modal__template').content;

// let modalArr = [];

function renderPokemons(pokemonsArr, element){
    element.innerHTML = null;
    pokemonsArr.forEach((pokemon) =>{
        const cloneTemplate = elTemplate.cloneNode(true)
        // const cloneModalTemplate = ModalTemplate.cloneNode(true)
        
        selectElem('.cards__img', cloneTemplate).src = pokemon.img;
        selectElem('.cards__title', cloneTemplate).textContent = pokemon.name;
        selectElem('.cards__type', cloneTemplate).textContent = pokemon.type;
        selectElem('.cards__weight', cloneTemplate).textContent = pokemon.weight;
        selectElem('.cards__age', cloneTemplate).textContent = pokemon.avg_spawns + " age";
        selectElem('.cards__like--btn', cloneTemplate).dataset.id = pokemon.id;
        // const elCardBtn = selectElem('.cards__like--btn', cloneTemplate);
        
        element.appendChild(cloneTemplate);
        
        
        // elCardBtn.addEventListener('click', (evt)=>{
            //     elCardBtn.classList.toggle('cards__like--active');
            //     let findPokemon = Arr.find(pokemon => pokemon.id == elCardBtn.dataset.id)
            
            //     if(!modalArr.includes(findPokemon)){
                
                //         selectElem('.modal__img', cloneModalTemplate).src = findPokemon.img;
                //         selectElem('.modal__title', cloneModalTemplate).textContent = findPokemon.name;
                //         selectElem('.modal__type', cloneModalTemplate).textContent = findPokemon.type;
                //         selectElem('.modal__weight', cloneModalTemplate).textContent = findPokemon.weight;
                //         selectElem('.modal__age', cloneModalTemplate).textContent = findPokemon.avg_spawns + " age";
                //         selectElem('.modal__like--btn', cloneModalTemplate).dataset.modalid = findPokemon.id;
                //         const elLikeBtn = selectElem('.modal__like--btn', cloneModalTemplate);
                
                //         sidebar.appendChild(cloneModalTemplate);
                
                //         modalArr.push(findPokemon)
                //     }else{
                    
                    //     }
                    // })
                })
                // modalArr.forEach(item => sidebar.appendChild(item));
            }
            renderPokemons(pokemons, elMenu);
            
            function renderTypes(pokemonsArr, element){
                let result = [];
                pokemonsArr.forEach((pokemon) =>{
                    pokemon.type.forEach(tip =>{
                        if(!result.includes(tip)){
                            result.push(tip);
                        }; 
                    });
                });
                result.forEach(tip =>{
                    let newOption = createElem('option');
                    newOption.textContent = tip;
                    newOption.value = tip;
                    element.appendChild(newOption);
                });
            };
            renderTypes(pokemons, elSelect);
            
            elForm.addEventListener('submit', (e) =>{
                e.preventDefault();
                
                const inputValue = elSearch.value.trim();
                const selectValue = elSelect.value.trim();
                const filterValue = elFilter.value.trim();
                
                const regex = new RegExp(inputValue, 'gi');
                const filteredPokemons = pokemons.filter((pokemon)=> pokemon.name.match(regex));
                
                let foundPokemons = [];
                
                if(selectValue === 'All'){
                    foundPokemons = filteredPokemons;
                }else{
                    foundPokemons = filteredPokemons.filter(pokemon => pokemon.type.includes(selectValue));
                }
                //---------------------- by Alphabet
                if(filterValue === 'Aa__Zz'){
                    foundPokemons.sort((a, b) => {
                        if(a.name > b.name){
                            return 1
                        }else if( a.name < b.name){
                            return -1
                        }else{
                            return 0
                        }
                    })
                }else if(filterValue === 'Zz__Aa'){
                    foundPokemons.sort((a, b) => {
                        if(a.name > b.name){
                            return -1
                        }else if( a.name < b.name){
                            return 1
                        }else{
                            return 0
                        }
            })
        }
        //-------------------------------- by Weight
        else if(filterValue === 'Light__Heavy'){
            foundPokemons.sort((a, b) => {
                if(a.weight > b.weight){
                    return 1
                }else if( a.weight < b.weight){
                    return -1
                }else{
                    return 0
                }
            })
        }else if(filterValue === 'Heavy__Light'){
            foundPokemons.sort((a, b) => {
                if(a.weight > b.weight){
                    return -1
                }else if( a.weight < b.weight){
                    return 1
                }else{
                    return 0
                }
            })
        }
        //------------------ by Age
        else if(filterValue === 'Young__Old'){
            foundPokemons.sort((a, b) => {
                if(a.avg_spawns > b.avg_spawns){
                    return 1
                }else if( a.avg_spawns < b.avg_spawns){
                    return -1
                }else{
                    return 0
                }
            })
        }else if(filterValue === 'Old__Young'){
            foundPokemons.sort((a, b) => {
                if(a.avg_spawns > b.avg_spawns){
                    return -1
                }else if( a.avg_spawns < b.avg_spawns){
                    return 1
                }else{
                    return 0
                }
            })
        }
        elSearch.value = null;
        renderPokemons(foundPokemons, elMenu);
    })
    
    const elSidebar = selectElem('.sidebar');
    const elSidebarWrap = selectElem('.sidebar__wrapper');
    const sidebarMenu = selectElem('sidebar__list');
    const elOpenBtn = selectElem('.header__like--btn');
    const elCloseBtn = selectElem('.close-btn');
    
    
    elOpenBtn.addEventListener('click', () =>{
        // document.querySelector('.fav__card .sidebar__list').innerHTML = "";        
        elSidebar.classList.add('sidebar--active');

        // document.querySelectorAll(".modal__item").forEach((card) =>{
        //     if(card.children[1].children[1].classList.contains("cards__like--active")){
        //         document.querySelector('.fav__card .sidebar__list').innerHTML += card.outerHTML; 
        //     }
        // });
        // document.querySelectorAll('.fav__card .modal__item').forEach((el) => {
        //     el.classList.add('')
        // })
    })
    elCloseBtn.addEventListener('click', () =>{
        elSidebar.classList.remove('sidebar--active');
    })
    
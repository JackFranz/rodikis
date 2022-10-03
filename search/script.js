/*
|---------------------------------------
| Post Filters
|---------------------------------------
*/

function initPostFilters() {
    const filterBtn = document.querySelector(".fl-filter-btn");
    const dropdown = document.querySelector(".fl-filter-dropdown");
    const dropdownWrap = document.querySelector(".fl-filter-dropdown-wrapper");
    let dropdownWrapHeight = dropdownWrap.offsetHeight;
    let filterIsOpen = false;

    const filterItems = document.querySelectorAll(".fl-filter-item");
    let filtersActiveObj = {};
    let filtersActiveNum = 0;
    const filtersActive = document.querySelector(".fl-filters-active");

    function handleClick() {
        if (filterIsOpen) {
            filterIsOpen = false;
            closeFilters();
        } else {
            filterIsOpen = true;
            openFilters();
        }
    }

    function openFilters() {
        filterBtn.classList.add("open");
        dropdown.classList.add("open");
        dropdown.style.height = `${dropdownWrapHeight}px`;
    }

    function closeFilters() {
        filterBtn.classList.remove("open");
        dropdown.classList.remove("open");
        dropdown.style.height = "0";
    }

    function activeFilters(event) {
        const filterGroup = event.target.getAttribute("name");
        filtersActiveObj[filterGroup] = event.target.value;
        filtersActiveNum = Object.keys(filtersActiveObj).length;
        for (const prop in filtersActiveObj) {
            if (filtersActiveObj[prop] === "") {
                filtersActiveNum--;
            }
        }
        filtersActive.innerText = filtersActiveNum;
        if (filtersActive.innerText === "0") {
            filtersActive.classList.add("empty");
        } else {
            filtersActive.classList.remove("empty");
        }
    }

    window.addEventListener(
        "resize",
        _.debounce(() => {
            dropdownWrapHeight = dropdownWrap.offsetHeight;
        }, 200)
    );
    filterBtn.addEventListener("click", handleClick);
    filterItems.forEach((filter) => {
        filter.addEventListener("input", _.debounce(activeFilters, 150));
    });
}

initPostFilters();

/*
|---------------------------------------
| Custom Select
|---------------------------------------
*/

function initSelect(select) {
    const wrapper = select.querySelector(".fl-select-wrapper");
    const selectText = select.querySelector(".fl-select-btn__text");
    const defaultOption = select.querySelector(
        ".fl-select-dropdown li:first-child label"
    );
    const resetBtn = select.querySelector(".fl-select-reset");

    function closeDropdown() {
        wrapper.classList.remove("open");
        document.removeEventListener("click", handleClickOutside);
    }

    function btnClick() {
        if (!wrapper.classList.contains("open")) {
            wrapper.classList.add("open");
            document.addEventListener("click", handleClickOutside);
        } else {
            closeDropdown();
        }
    }

    function resetClick(event) {
        defaultOption.click();
    }

    function optionClick(event) {
        selectText.innerText = event.target.innerText;

        if (resetBtn) {
            if (event.target.contains(defaultOption)) {
                resetBtn.classList.add("hidden");
            } else {
                resetBtn.classList.remove("hidden");
            }
        }

        closeDropdown();
    }

    function handleClick(event) {
        if (event.target.closest(".fl-select-btn")) {
            btnClick();
        }
        if (event.target.closest("label")) {
            optionClick(event);
        }
        if (event.target.contains(resetBtn)) {
            resetClick(event);
        }
    }

    function handleClickOutside(event) {
        if (!select.contains(event.target)) closeDropdown();
    }

    select.addEventListener("click", handleClick);
}

const selectElements = document.querySelectorAll(".fl-select");
selectElements.forEach(function (select) {
    initSelect(select);
});

/*
|---------------------------------------
| Isotope
|---------------------------------------
*/

function initIsotope(grid) {
    if (!grid) return;

    let searchValue;
    let selectValue;
    let filters = {};

    function handleSearchInput() {
        searchValue = new RegExp(searchFilter.value, "gi");
        iso.arrange();
    }

    function handleSelect(event) {
        const filterGroup = event.target.getAttribute("name");
        filters[filterGroup] = event.target.value;
        selectValue = concatValues(filters);
        iso.arrange();
    }

    function concatValues(obj) {
        let value = "";
        for (const prop in obj) {
            value += obj[prop];
        }
        return value;
    }

    function handleViewSelect(event) {
        const viewName = event.target.id;
        const viewValue = event.target.value;
        iso.arrange({ layoutMode: viewValue });
        grid.classList.add(`${viewName}`);
    }

    function handleSortSelect(event) {
        const sortValue = event.target.value;
        iso.arrange({ sortBy: sortValue });
    }

    // init Isotope
    const iso = new Isotope(grid, {
        itemSelector: ".fl-post-item",
        filter: function (item) {
            const searchResult = searchValue
                ? item.innerText.match(searchValue)
                : true;
            const selectResult = selectValue ? item.matches(selectValue) : true;
            return searchResult && selectResult;
        },
        getSortData: {
            views: "[data-views] parseInt",
            likes: "[data-likes] parseInt",
            alpha: ".fl-post-title"
        },
        sortAscending: {
            views: false,
            likes: false,
            alpha: true
        }
    });

    const selectFilters = document.querySelectorAll(".fl-filter-select");
    selectFilters.forEach(function (el) {
        el.addEventListener("change", handleSelect);
    });

    const searchFilter = document.querySelector(".fl-search-filter");
    searchFilter.addEventListener("input", _.debounce(handleSearchInput, 150));

    const viewBtn = document.querySelector(".fl-view-select");
    viewBtn.addEventListener("change", handleViewSelect);

    const sortBtn = document.querySelector(".fl-sort-select");
    sortBtn.addEventListener("change", handleSortSelect);
}

const isoGrid = document.querySelector(".grid");
initIsotope(isoGrid);
import React from 'react';

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
const HeaderBar = () => (
    <nav>
        <div className="nav-wrapper ">
            <a href="#" className="brand-logo">Look4Fruit Парсеры</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><a href="#">Сравнительная табличка</a></li>
            </ul>
        </div>
    </nav>
);

export default HeaderBar;
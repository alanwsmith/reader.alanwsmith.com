import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import style from './style.css';

const Home = () => {
    const [pageData, setPageData] = useState({pages: []});

    return (
	          <div class={style.home}>
		        <h1>Home</h1>
            <Stuff />
	          </div>
    );
};


export default Home;



function setCookie(name, value) {
    document.cookie = `${name}=${encodeURIComponent(value)};max-age=31536000`;
}

function getCookie(name) {
    const cookies = document.cookie.split('; ');
    if (cookies.length > 1) {
        const cookieRow = cookies
              .find(row => row.startsWith(`${name}=`));
        if (cookieRow !== undefined) {
            return decodeURIComponent(cookieRow.split('=')[1]);
        } else {
            return null;
        }
    } else {
        return null;
    }
}

function deleteCookie(name) {
    document.cookie = `${name}=;max-age=0`;
}

function Stuff () {
    const [pageData, setPageData] = useState(null);
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        const cookieCurrentId = getCookie('currentId');
        if (cookieCurrentId === null) {
            setCookie('currentId', '0');
            setCurrentId(0);
        } else {
            setCurrentId(parseInt(cookieCurrentId));
        }
    });

    useEffect(() =>{
        fetch('/assets/data/org-mode-manual.json')
            .then((response) => response.json())
            .then((data) => {
                setPageData(data);
            });
    }, [setPageData]);

    if (currentId !== null) {
        if (pageData !== null) {
            return <div dangerouslySetInnerHTML={{
                __html: `${pageData.pages[currentId].content}`
            }} />;
        } else {
            return <div>not yet loaded</div>;
        }
    } else {
        return <div>not yet loaded</div>;
    }

};



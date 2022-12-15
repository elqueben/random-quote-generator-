function App(){

    const [quotes, setQuotes] = React.useState([]);
    const [randomQuote, setRandomQuote] = React.useState("");
    const [color, setColor] = React.useState("#F8B195")

    React.useEffect(() => {
        async function fetchData(){
            const response = await fetch("https://type.fit/api/quotes")
            const data = await response.json();

            setQuotes(data);
            let randIndex = Math.floor(Math.random() * data.length);
            setRandomQuote(data[randIndex])
        }
        fetchData();
    }, [])

    const getNewQuote = () => {

        const colors = [
            "#F8B195",
            "#F67280",
            "#C06C84",
            "#6C5B7B",
            "#355C7D" 
 
        ];

        let randIndex = Math.floor(Math.random() * quotes.length);
        let randColorIndex = Math.floor(Math.random() * colors.length);
        setRandomQuote(quotes[randIndex])
        setColor(colors[randColorIndex])
    }


    return (
        <div style={{backgroundColor: color, minHeight: "100vh"}}>
            <div className="container pt-5">
                <div className="jumbotron">
                    <div className="card">
                        <div className="card-header"><h3>Inspirational Quotes</h3></div>
                        <div className="card-body">
                            {randomQuote ? (
                                <>
                                <h5 className="card-title">- {randomQuote.author || "Unknown"}</h5>
                                <h3 className="card-text">&quot;{randomQuote.text}&quot;</h3>
                                </>
                            ) : (
                                <h2>Loading...</h2>
                            )}

                            <div className="row">
                                <div className="col-sm">
                                    <button onClick={getNewQuote} className="btn btn-primary ml-3">New Quote</button>
                                    <a href={
                                        "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + encodeURIComponent(
                                        '"' + randomQuote.text +'"' + "\n" + "-" + randomQuote.author
                                            )
                                        }
                                        target="_blank" className="btn btn-danger"><i class="fa fa-twitter"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
}
ReactDOM.render(<App/>, document.getElementById("app"))
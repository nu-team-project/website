export default function HumidityData(props)
{
    return(
        <section>
            <h2>Humidity</h2>

            <div className="item">
                <h3>Humidity: {props.data}%</h3>
            </div>
        </section>
    );
}
export default function TemperatureData(props)
{
    return(
        <section>
            <h2>Temperature</h2>

            <div className="item">
                <h3>Temperature: {props.data} degrees C</h3>
            </div>
        </section>
    );
}
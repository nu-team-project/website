export default function CarbonDioxideData(props)
{
    return(
        <section>
            <h2>Carbon Dioxide</h2>

            <div className="item">
                <h3>Co2: {props.data}%</h3>
            </div>
        </section>
    );
}
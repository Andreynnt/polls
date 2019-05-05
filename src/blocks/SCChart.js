import React from 'react';
import PropTypes from "prop-types";
import Chart from 'react-apexcharts'
import {platform, Header} from "@vkontakte/vkui";


class SCChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //let font = osname === IOS ? "Helvetica Neue, Arial" : "Roboto, Arial";
        const font = "Roboto, Arial";
        let settings = {
            chart: {
                height: 350,
                type: 'bar',
                toolbar: {
                    show: false
                },
                fontFamily: font,
                selection: {
                    enabled: false
                },
                states: {
                    normal: {
                        filter: {
                            type: 'none',
                            value: 0,
                        }
                    },
                    hover: {
                        filter: {
                            type: 'none'
                        }
                    },
                    active: {
                        filter: {
                            type: 'none'
                        }
                    },
                }
            },
            plotOptions: {
                bar: {
                    barHeight: '80%',
                    horizontal: true,
                    dataLabels: {
                        position: 'bottom'
                    },
                }
            },
            dataLabels: {
                enabled: true,
                textAnchor: 'start',
                formatter: function (val, opt) {
                    return opt.w.globals.labels[opt.dataPointIndex] + ": " + val
                },
                offsetX: 0,
                dropShadow: {
                    enabled: false
                },
                style: {
                    fontSize: '14px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    colors: ['black']
                },
            },
            series: [{
                data: []
            }],
            xaxis: {
                categories: [],
                labels: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                axisBorder: {
                    show: false,
                }
            },
            yaxis: {
                labels: {
                    show: false
                }
            },
            fill: {
                colors: ['#34C3C1']
            },
            grid: {
                borderColor: "transparent"
            },
            tooltip: {
                theme: 'dark',
                x: {
                    show: false
                },
                y: {
                    title: {
                        formatter: function (val, opt) {
                            return opt.w.globals.labels[opt.dataPointIndex]
                        },
                    }
                }
            },
            states: {
                hover: {
                    filter: { type: 'none' }
                },
                active: {
                    filter: { type: 'none' }
                }
            }
        };

        if (this.props.questionWithAnswers.type === "one" || this.props.questionWithAnswers.type === "multi") {
            Object.entries(this.props.questionWithAnswers.answers).map(keyAndValue => {
                settings.series[0].data.push(keyAndValue[1]);
                settings.xaxis.categories.push(keyAndValue[0]);
            });

            if (this.props.questionWithAnswers.other === true) {
                settings.series[0].data.push(this.props.questionWithAnswers.other_val);
                settings.xaxis.categories.push("Другое");
            }
        } else if (this.props.questionWithAnswers.type === "open") {
            return (
                <Header level="2">Результаты открытых вариантов недоступны для просмотра</Header>
            );
        }

        const answersAmount = Object.entries(this.props.questionWithAnswers.answers).length;
        let height = answersAmount * 85;
        if (answersAmount === 1) {
            height = 150
        }

        return (
            <div style={{marginRight: "20px", pointerEvents: "none"}}>
                <Chart options={settings} series={settings.series} type="bar"  height={height} />
            </div>
        );
    }
}

SCChart.propTypes = {
    questionWithAnswers: PropTypes.object.isRequired
};

export default SCChart;

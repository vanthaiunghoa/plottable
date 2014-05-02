function layoutChart(data) {
  // The two subplots will share an xScale, but have two seperate yScales for their data
  var xScale        = new Plottable.LinearScale();
  var yScaleCommits = new Plottable.LinearScale();
  var yScaleLOC     = new Plottable.LinearScale();

  var xAxis         = new Plottable.XAxis(xScale, "bottom");
  var yAxisCommits  = new Plottable.YAxis(yScaleCommits, "left");
  var yAxisLOC      = new Plottable.YAxis(yScaleLOC, "right");

  // A DataSource is a Plottable object that maintains data and metadata, and updates dependents when it changes
  // In the previous example, we implicitly created a DataSource by putting the data directly into the Renderer constructor
  var gitDataSource   = new Plottable.DataSource(data);
  var commitsRenderer = new Plottable.LineRenderer(gitDataSource, xScale, yScaleCommits);
  var locRenderer     = new Plottable.LineRenderer(gitDataSource, xScale, yScaleLOC);

  commitsRenderer.project("x", "day_delta", xScale);
  locRenderer    .project("x", "day_delta", xScale);

  commitsRenderer.project("y", "commit_number", yScaleCommits);
  locRenderer    .project("y", "lines_of_code", yScaleLOC);

  var commitsTitle = new Plottable.TitleLabel("# of Commits Over Time");
  var locTitle     = new Plottable.TitleLabel("# of Lines Of Code Over Time");

  var chart = new Plottable.Table([
                    [null        , commitsTitle   , null        ],
                    [yAxisCommits, commitsRenderer, null        ],
                    [null        , locTitle       , null        ],
                    [null        , locRenderer    , yAxisLOC    ],
                    [null        , xAxis          , null        ]
                  ]);

  chart.renderTo("#layout");
}

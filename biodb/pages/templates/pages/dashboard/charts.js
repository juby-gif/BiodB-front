{% block jquery %}
var endpoint = '/api/chart/data'

$.ajax({
    method: "GET",
    url: endpoint,
    success: function(data){
      <code for the chart>
    },
    error: function(error_data){
      console.log(error_data)
    }
})

{% endblock %}

??
<!-- <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.bundle.js" integrity="sha256-o8aByMEvaNTcBsw94EfRLbBrJBI+c3mjna/j4LrfyJ8=" crossorigin="anonymous"></script> -->

<!--><h2>Logging out, please wait...</h2>-->
<!-- {% extends 'index.html' %} -->

<!-- <script>
  // {% block jquery %}
  // {% include "pages/dashboard/charts.js" %}
</script> -->
??

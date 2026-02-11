$(document).ready(function () {
  var questions = [
    {
      q: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Text Machine Language",
        "Hyperlinks Text Markup",
      ],
      answer: 0,
    },
    {
      q: "Which symbol is used for jQuery?",
      options: ["$", "#", "&"],
      answer: 0,
    },
    {
      q: "Which language is used for styling?",
      options: ["HTML", "CSS", "Java"],
      answer: 1,
    },
  ];

  var index = 0;
  var score = 0;
  var selectedAnswers = [];

  function loadQuestion() {
    $(".quiz-box").hide().fadeIn(400);
    $("#question").text(questions[index].q);
    $("#options").empty();

    $.each(questions[index].options, function (i, opt) {
      $("#options").append(
        `<label>
            <input type="radio" name="option" value="${i}"> ${opt}
        </label>`
      );
    });

    if (selectedAnswers[index] !== undefined) {
      $(`input[value=${selectedAnswers[index]}]`).prop("checked", true);
    }
  }

  loadQuestion();

  $("#next").click(function () {
    if ($("input[name='option']:checked").length == 0) {
      alert("Please select an answer");
      return;
    }

    selectedAnswers[index] = $("input[name='option']:checked").val();
    index++;

    if (index < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  });

  $("#prev").click(function () {
    if (index > 0) {
      index--;
      loadQuestion();
    }
  });

  function showResult() {
    score = 0;

    for (var i = 0; i < questions.length; i++) {
      if (selectedAnswers[i] == questions[i].answer) {
        score++;
      }
    }

    $(".result").show();
    $("#score").text("Your Score: " + score + "/" + questions.length);
    $("#question, #options, #next, #prev").hide();
  }

  $("#restart").click(function () {
    index = 0;
    score = 0;
    selectedAnswers = [];
    $(".result").hide();
    $("#question, #options, #next, #prev").show();
    loadQuestion();
  });
});

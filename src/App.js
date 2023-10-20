import { useState } from "react";

function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}

export default function App() {
  return (
    <div className="app">
      <GoalTracker />
    </div>
  );
}

function GoalTracker() {
  const goalsData = [
    { Name: "Study", timeSpan: 12, discription: "Philosophy" },
    { Name: "Working", timeSpan: 24, discription: "Book keeping" },
    { Name: "Exercise", timeSpan: 15, discription: "Home exercise" },
    {
      Name: "Practice art",
      timeSpan: 22,
      discription: "guitar learning",
    },
  ];

  const [goal, setGoal] = useState(goalsData);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showAddGoall, setShowAddGoal] = useState(false);

  function handleGoal(newGoal) {
    setGoal((goal) => [...goal, newGoal]);
  }

  function handleSelection(goal) {
    setSelectedGoal(goal);
    console.log("clicked");
  }

  function handleShowAddGoal() {
    setShowAddGoal((show) => !show);
  }

  return (
    <div className="goal-tracker">
      <ActiveGoals
        data={goal}
        onSelection={handleSelection}
        onShowAddGoal={handleShowAddGoal}
      />

      {selectedGoal && <GoalDetails data={goal} selectedGoal={selectedGoal} />}

      {showAddGoall && <AddGoal onHandleGoal={handleGoal} />}
    </div>
  );
}

function ActiveGoals({ data, onSelection, onShowAddGoal }) {
  return (
    <div className="active-goals">
      <h3>Active goals</h3>
      <ul>
        {data.map((goal, index) => (
          <ActiveGoal goalObj={goal} key={index} onSelection={onSelection} />
        ))}
      </ul>
      <Button className="add-goal-button" onClick={onShowAddGoal}>
        Add new Goal
      </Button>
    </div>
  );
}

function ActiveGoal({ goalObj, onSelection }) {
  return (
    <li>
      <div className="active-goalstructure">
        <p style={{ color: "red" }}>{goalObj.Name}</p>
        <p style={{ color: "green" }}>in progress</p>
        <p>{goalObj.discription}</p>
        <Button onClick={() => onSelection(goalObj)}>check</Button>
      </div>
    </li>
  );
}

function GoalDetails({ selectedGoal }) {
  return (
    <div className="goal-details">
      <h3>Goal details</h3>
      <ul>
        <li>{`Deadline: ${selectedGoal.timeSpan}`}</li>
        <li>How many days remained : </li>
        <li>Time progression toward the goal : 12</li>
        <li>{`Goal description : ${selectedGoal.discription}`}</li>
      </ul>
    </div>
  );
}

function AddGoal({ onHandleGoal }) {
  const [timeSpan, setTimeSpan] = useState(0);
  const [Name, setName] = useState("");
  const [discription, setDiscription] = useState("");

  function handlesubmit(e) {
    e.preventDefault();

    const newGoal = {
      Name,
      timeSpan,
      discription,
    };
    onHandleGoal(newGoal);
  }

  return (
    <div className="add-goal">
      <h3>Add new goals</h3>
      <form onSubmit={handlesubmit}>
        <div className="goal-name">
          <label>Goal Name: </label>
          <input
            type="text"
            placeholder="type the goal name..."
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="time-span">
          <label>Goal time span: </label>
          <select
            value={timeSpan}
            onChange={(e) => setTimeSpan(+e.target.value)}
          >
            {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => (
              <option value={num} key={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div className="description">
          <label>Description: </label>
          <input
            type="text"
            className="description-input"
            value={discription}
            onChange={(e) => setDiscription(e.target.value)}
          ></input>
        </div>
        <Button>add</Button>
      </form>
    </div>
  );
}

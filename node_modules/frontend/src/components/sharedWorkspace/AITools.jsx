import { useState } from 'react';
import './AITools.css';

export default function AITools({ workspaceId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeAction, setActiveAction] = useState(null);
  const [results, setResults] = useState(null);

  // Workspace-specific mock data
  const getWorkspaceMockData = (wsId) => {
    const defaultData = {
      summaries: {
        study: "Key concepts and study notes summary.",
        formulas: "Essential formulas and equations.",
        ideas: "Study group ideas and collaboration notes."
      },
      flashcards: [
        { front: "Question 1", back: "Answer 1" },
        { front: "Question 2", back: "Answer 2" }
      ],
      questions: [
        { question: "Sample question?", answer: "Sample answer" }
      ]
    };

    const workspaceData = {
      "ws_001": { // CS3203 Software Engineering
        summaries: {
          study: "Key concepts: Software design patterns (Singleton, Factory, Observer), Agile methodology (Scrum, Kanban), RESTful API design, database normalization, and version control with Git. Focus areas include code review practices, unit testing, and system architecture design.",
          formulas: "Important metrics: Code coverage = (Lines covered / Total lines) × 100%, Velocity = Story points completed per sprint, Defect density = Defects / KLOC (thousand lines of code), MTTR = Mean Time To Recovery.",
          ideas: "Project ideas: Build a collaborative code review platform, create a CI/CD pipeline demo, develop a microservices architecture example, design a database schema for a student management system, implement authentication and authorization patterns."
        },
        flashcards: [
          { front: "What is the Singleton pattern?", back: "A design pattern that ensures a class has only one instance and provides global access to it." },
          { front: "What is REST?", back: "Representational State Transfer - an architectural style for designing networked applications using HTTP methods." },
          { front: "What is the difference between GET and POST?", back: "GET retrieves data (idempotent), POST creates/submits data (not idempotent)." },
          { front: "What is database normalization?", back: "The process of organizing data to reduce redundancy and improve data integrity through normal forms (1NF, 2NF, 3NF)." },
          { front: "What is a microservice?", back: "A small, independent service that communicates over well-defined APIs and is independently deployable." }
        ],
        questions: [
          {
            question: "Explain the difference between monolithic and microservices architecture.",
            answer: "Monolithic: Single deployable unit, easier to develop initially but harder to scale. Microservices: Multiple independent services, better scalability and fault isolation but more complex to manage."
          },
          {
            question: "What are the key principles of Agile development?",
            answer: "Iterative development, customer collaboration, responding to change, working software over documentation, individuals and interactions over processes."
          },
          {
            question: "How does the Factory pattern work?",
            answer: "It provides an interface for creating objects without specifying their exact classes. The factory method delegates object creation to subclasses."
          },
          {
            question: "What is the purpose of unit testing?",
            answer: "To test individual components in isolation, ensuring each unit functions correctly before integration, improving code quality and reducing bugs."
          }
        ]
      },
      "ws_002": { // MATH101 Calculus
        summaries: {
          study: "Key concepts: Limits, continuity, derivatives, and integrals. Focus areas include chain rule, product rule, quotient rule, integration by parts, and fundamental theorem of calculus. Main formulas: d/dx(x^n) = nx^(n-1), ∫x^n dx = x^(n+1)/(n+1) + C, d/dx(e^x) = e^x.",
          formulas: "Essential formulas: Power rule: d/dx(x^n) = nx^(n-1), Product rule: d/dx(fg) = f'g + fg', Quotient rule: d/dx(f/g) = (f'g - fg')/g², Chain rule: d/dx[f(g(x))] = f'(g(x))·g'(x), Integration: ∫x^n dx = x^(n+1)/(n+1) + C.",
          ideas: "Study strategies: Practice derivative and integral problems daily, create formula flashcards, work through textbook examples, form study groups for problem-solving sessions, use graphing calculators to visualize functions."
        },
        flashcards: [
          { front: "What is the derivative of x²?", back: "2x" },
          { front: "What is the integral of 1/x?", back: "ln|x| + C" },
          { front: "What is the chain rule?", back: "d/dx[f(g(x))] = f'(g(x)) · g'(x)" },
          { front: "What is the limit of sin(x)/x as x approaches 0?", back: "1" },
          { front: "What is the derivative of e^x?", back: "e^x" }
        ],
        questions: [
          {
            question: "Find the derivative of f(x) = 3x³ + 2x² - 5x + 1",
            answer: "f'(x) = 9x² + 4x - 5"
          },
          {
            question: "Evaluate the integral ∫(2x + 3)dx",
            answer: "x² + 3x + C"
          },
          {
            question: "What is the limit of (x² - 4)/(x - 2) as x approaches 2?",
            answer: "4 (using L'Hôpital's rule or factoring: (x-2)(x+2)/(x-2) = x+2, so limit is 2+2 = 4)"
          },
          {
            question: "Find the area under the curve y = x² from x = 0 to x = 3",
            answer: "9 square units (∫₀³ x² dx = [x³/3]₀³ = 27/3 - 0 = 9)"
          },
          {
            question: "What is the derivative of ln(x)?",
            answer: "1/x"
          }
        ]
      },
      "ws_003": { // Data Structures Review
        summaries: {
          study: "Key concepts: Arrays, linked lists, stacks, queues, trees (binary, BST, AVL), hash tables, graphs, and sorting algorithms (bubble, merge, quick, heap). Focus areas include time complexity analysis (Big O notation), space complexity, and choosing appropriate data structures for problems.",
          formulas: "Complexity formulas: Binary search: O(log n), Linear search: O(n), Bubble sort: O(n²), Merge sort: O(n log n), Quick sort: O(n log n) average, Hash table lookup: O(1) average, Tree traversal: O(n), Binary tree height: h = log₂(n+1) - 1.",
          ideas: "Practice ideas: Implement all major data structures from scratch, solve LeetCode problems daily, create visualizations of algorithms, practice time complexity analysis, build a project using multiple data structures together."
        },
        flashcards: [
          { front: "What is the time complexity of binary search?", back: "O(log n) - divides search space in half each iteration." },
          { front: "What is the difference between a stack and a queue?", back: "Stack: LIFO (Last In First Out). Queue: FIFO (First In First Out)." },
          { front: "What is a binary search tree?", back: "A tree where left child < parent < right child, enabling efficient search, insertion, and deletion." },
          { front: "What is the time complexity of quicksort?", back: "O(n log n) average case, O(n²) worst case." },
          { front: "What is hashing?", back: "A technique to map data to array indices using a hash function for O(1) average lookup time." }
        ],
        questions: [
          {
            question: "Explain the difference between an array and a linked list.",
            answer: "Array: Contiguous memory, O(1) access, fixed size. Linked list: Non-contiguous nodes with pointers, O(n) access, dynamic size, better for insertions/deletions."
          },
          {
            question: "What is the time complexity of finding an element in a hash table?",
            answer: "O(1) average case, O(n) worst case (if all elements hash to same bucket)."
          },
          {
            question: "How does merge sort work?",
            answer: "Divide array in half recursively until single elements, then merge sorted halves back together. Time: O(n log n), Space: O(n)."
          },
          {
            question: "What is the difference between BFS and DFS?",
            answer: "BFS (Breadth-First Search): Explores level by level using a queue. DFS (Depth-First Search): Explores as deep as possible using a stack or recursion."
          },
          {
            question: "What is an AVL tree?",
            answer: "A self-balancing binary search tree where the height difference between left and right subtrees is at most 1, ensuring O(log n) operations."
          }
        ]
      },
      "ws_004": { // Physics Study Hub
        summaries: {
          study: "Key concepts: Mechanics (kinematics, dynamics, energy, momentum), thermodynamics (laws of thermodynamics, heat transfer), waves and oscillations, and electromagnetism. Focus areas include Newton's laws, conservation of energy and momentum, wave equations, and electric/magnetic fields.",
          formulas: "Essential formulas: F = ma (Newton's 2nd law), E = mc² (mass-energy equivalence), KE = ½mv² (kinetic energy), PE = mgh (gravitational potential), v = fλ (wave equation), PV = nRT (ideal gas law), F = kx (Hooke's law).",
          ideas: "Study approaches: Work through physics problems step-by-step, draw free-body diagrams, understand unit conversions, practice dimensional analysis, create concept maps connecting different physics topics, use simulations to visualize phenomena."
        },
        flashcards: [
          { front: "What is Newton's First Law?", back: "An object at rest stays at rest, and an object in motion stays in motion at constant velocity, unless acted upon by a net force." },
          { front: "What is the formula for kinetic energy?", back: "KE = ½mv², where m is mass and v is velocity." },
          { front: "What is the wave equation?", back: "v = fλ, where v is velocity, f is frequency, and λ is wavelength." },
          { front: "What is the ideal gas law?", back: "PV = nRT, where P is pressure, V is volume, n is moles, R is gas constant, T is temperature." },
          { front: "What is conservation of momentum?", back: "Total momentum before collision equals total momentum after collision in an isolated system: m₁v₁ + m₂v₂ = m₁v₁' + m₂v₂'." }
        ],
        questions: [
          {
            question: "A 2 kg object is pushed with a force of 10 N. What is its acceleration?",
            answer: "a = F/m = 10 N / 2 kg = 5 m/s² (using F = ma)"
          },
          {
            question: "Calculate the kinetic energy of a 5 kg object moving at 10 m/s.",
            answer: "KE = ½mv² = ½(5 kg)(10 m/s)² = ½(5)(100) = 250 J"
          },
          {
            question: "What is the relationship between frequency and wavelength?",
            answer: "They are inversely proportional: v = fλ. As frequency increases, wavelength decreases (for constant velocity)."
          },
          {
            question: "Explain the first law of thermodynamics.",
            answer: "Energy cannot be created or destroyed, only transferred or converted. ΔU = Q - W, where U is internal energy, Q is heat added, W is work done."
          },
          {
            question: "What is the difference between speed and velocity?",
            answer: "Speed is a scalar (magnitude only), velocity is a vector (magnitude and direction). Speed = |velocity|."
          }
        ]
      }
    };

    return workspaceData[wsId] || defaultData;
  };

  const mockData = getWorkspaceMockData(workspaceId || "ws_001");

  const handleAction = (action) => {
    setActiveAction(action);
    
    if (action === 'summarize') {
      // Get notes from localStorage (mock - would get from actual notes)
      const notes = localStorage.getItem(`workspace-notes-${workspaceId || 'ws_001'}`);
      const notesData = notes ? JSON.parse(notes) : { study: '', formulas: '', ideas: '' };
      
      // Generate mock summary based on which tab has content
      let summary = mockData.summaries.study;
      if (notesData.formulas) summary = mockData.summaries.formulas;
      if (notesData.ideas) summary = mockData.summaries.ideas;
      
      setResults({ type: 'summary', content: summary });
    } else if (action === 'flashcards') {
      setResults({ type: 'flashcards', content: mockData.flashcards });
    } else if (action === 'questions') {
      setResults({ type: 'questions', content: mockData.questions });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setActiveAction(null);
    setResults(null);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="ai-tools-btn"
      >
        🤖 AI Tools
      </button>

      {isOpen && (
        <div className="ai-tools-modal-overlay" onClick={handleClose}>
          <div className="ai-tools-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ai-tools-modal-header">
              <h2>AI Tools</h2>
              <button
                type="button"
                onClick={handleClose}
                className="ai-tools-close-btn"
              >
                ×
              </button>
            </div>

            <div className="ai-tools-actions">
              <button
                type="button"
                className={`ai-tools-action-btn ${activeAction === 'summarize' ? 'active' : ''}`}
                onClick={() => handleAction('summarize')}
              >
                📝 Summarize Notes
              </button>
              <button
                type="button"
                className={`ai-tools-action-btn ${activeAction === 'flashcards' ? 'active' : ''}`}
                onClick={() => handleAction('flashcards')}
              >
                🎴 Generate Flashcards
              </button>
              <button
                type="button"
                className={`ai-tools-action-btn ${activeAction === 'questions' ? 'active' : ''}`}
                onClick={() => handleAction('questions')}
              >
                ❓ Generate Practice Questions
              </button>
            </div>

            {results && (
              <div className="ai-tools-results">
                <h3>
                  {results.type === 'summary' && 'Summary'}
                  {results.type === 'flashcards' && 'Flashcards'}
                  {results.type === 'questions' && 'Practice Questions'}
                </h3>
                <div className="ai-tools-results-content">
                  {results.type === 'summary' && (
                    <p className="summary-text">{results.content}</p>
                  )}
                  
                  {results.type === 'flashcards' && (
                    <div className="flashcards-list">
                      {results.content.map((card, index) => (
                        <div key={index} className="flashcard-item">
                          <div className="flashcard-front">
                            <strong>Front:</strong> {card.front}
                          </div>
                          <div className="flashcard-back">
                            <strong>Back:</strong> {card.back}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {results.type === 'questions' && (
                    <div className="questions-list">
                      {results.content.map((item, index) => (
                        <div key={index} className="question-item">
                          <div className="question-text">
                            <strong>Q{index + 1}:</strong> {item.question}
                          </div>
                          <div className="answer-text">
                            <strong>Answer:</strong> {item.answer}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}


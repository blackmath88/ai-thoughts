# From Agent-Centric AI to Semantic Computation in Software

**Conversation synthesis — 19 October 2026**  
**Purpose:** Preserve the original ideas, the assistant's responses, and the architectural thesis developed through this discussion. This is a conceptual handoff, not an implementation decision or an authorization to change repositories.

## Executive summary

The central proposal is to stop designing software *around agents* and instead build well-specified, domain-specific software that uses LLM inference as a **modular semantic computational capability wherever needed**. An agent may solve an open-ended problem, but that does not make an agent loop a scalable production architecture. As repeated work becomes understood, its structure should be captured in software: domain models, state, contracts, operations, orchestration, verification and evidence. Language models then address the remaining ambiguity, interpretation and invention.

**Core formulation:** *We do not need better software that accommodates agents. We need better software that can call on intelligence.*

**Memorable metaphor:** *The agent can help build the factory; it should not have to impersonate the factory every time a car is ordered.*

---

## 1. The starting point: Cloudflare, Deno and Durable Objects

### User's opening observation (lightly cleaned for readability)

> “So Cloudflare bought Deno. Because of Durable Objects. Everything I hear: yes, Durable Objects fit into my thinking of dev system AI architecture.”

The conversation began with the Cloudflare–Deno development and the possibility that Durable Objects offer a useful primitive for the user's existing system architecture.

### Assistant's response

Durable Objects were presented as individually addressable, stateful coordination components: useful for persistent identities, operational state, concurrency coordination and event-driven activity. A possible fit was sketched across Weavr, Morrow/Hermes, Nebuchadnezzar, FAICTORY, Blackboard/Paratext and Build Radar.

The crucial boundary was:

> **Durable Objects coordinate. Weavr governs. Workers execute. Evidence proves.**

This was explicitly a **potential architecture**, not a claim that such a deployment exists. Durable Objects do not by themselves provide human authority, immutable evidence or correct external-effect replay. A cautious experiment was suggested instead of a rewrite: create one persistent mission coordinator, test restart/retry/recovery, and preserve canonical governance and evidence outside transient execution.

**Important caveat:** The acquisition, its stated rationale and portability roadmap are time-sensitive claims from the earlier exchange; confirm primary-source details before treating them as a current technical commitment. Self-hosted portability should not be assumed complete.

---

## 2. The user's first central thesis: agents are the wrong center of gravity

### Original input (close transcription; typos lightly normalized)

> “Now check my thoughts on agents and memory, and how we should not reinvent software development inside agents, but use LLM compute as modular bits in what we do as software.”
>
> “I hate that the discourse is agent-centric and we try to accommodate all around it. Instead we should think of agentic as semantic intelligence where needed.”
>
> “The larger the freedom and task of an agent, the less clear is the task and process.”
>
> “Using AI in an ‘agent does stuff for me’ way, the AI compute is good enough to compensate our deficiency in architecture.”
>
> “Imagine using that capacity less like one tool that has to do all, but more like a super-specialized dentist tool for one specific job — that one bike tool you need for opening the chain ring on a cassette. Imagine how good that tool would be.”

### Interpretation developed in the response

The criticism is **not anti-agent**; it is **anti-agent-centrism**. A highly capable general agent can hide weak process design by continuously interpreting goals, recovering context, choosing tools, correcting errors and deciding next actions. Those demonstrations can be powerful, but they are not necessarily good software architecture.

The assistant distinguished:

- **Agent-centric systems:** the LLM becomes the center of planning, memory, workflow, tools, governance and execution.
- **Software-centric intelligence:** software owns state, domain logic, interfaces, policy and control; model inference is invoked for bounded semantic work.

The user's specialized-tool analogy led to a key principle:

> **Narrow responsibility does not require narrow intelligence.**

A powerful model could perform an extremely specific, difficult semantic operation. Conversely, a small local model may be sufficient for large volumes of routine work. Model capability and scope of authority are separate choices.

Examples of reusable semantic operations discussed included classification, comparison, interpretation, explanation and bounded judgment. A hypothetical `semantic.diff` capability would compare two requirements, return evidence-bearing differences and uncertainty, and **not** receive authority to approve or change the requirements.

---

## 3. Memory should belong to software, not a simulated personality

The user's prompt explicitly connected **agents and memory**. The response proposed separating memory by kind and owner rather than treating conversational continuity as canonical project knowledge.

| Knowledge or memory | Appropriate owner |
|---|---|
| Established domain facts | Application database |
| Project goals, intent, mission meaning | Weavr semantic control plane / project records |
| Decisions, approvals and authority | Typed and attributable decision/policy records |
| Historical activity | Event ledger |
| Documents and evidence | Provenance-aware artifact store |
| Semantic relationships | Queryable indexes or graphs |
| Temporary reasoning context | Runtime session / attempt |
| Learned patterns | Evaluated proposals, promoted only through explicit acceptance |

An embedding, retrieval index or model summary is useful, but it should generally be treated as a **view or interpretation of durable records**, not as the authoritative record itself.

The design question changes from:

> “What does the agent remember?”

To:

> **“What does the software know, what is the evidence for it, and which interpretation is needed for this operation?”**

The assistant connected this with Weavr's preference for repository-owned state and runtime projections: workers receive sufficient, scoped context and provenance instead of a giant conversation transcript.

---

## 4. The user's second intervention: intelligence is not a production system

### Original input (close transcription; typos lightly normalized)

> “Yes, good summary.”
>
> “Unknown process, open problem — yes, that's the whole problem.”
>
> “LLMs give us the opportunity to load off an open problem with unknown process. That's not how business and solutions scale and work.”
>
> “Doesn't compute and software excel there where it's significantly specified in domain and field?”
>
> “Think about the leaps in technology and effectiveness and progress.”
>
> “It's where you tell the mechanic to build the whole car just because he can. It's when you invent the industrial separation of every step, the assembly line.”

This moved the argument from *how to integrate intelligence* to **how systems become scalable, repeatable and progressively more effective**.

### Assistant's response: capability versus industrialization

An exceptionally capable mechanic may build an entire car. That is a feat of expertise, but it is not automatically a scalable production process. Industrial advances came from decomposing work, standardizing interfaces, controlling tolerances, measuring output, and improving individual operations and the full system.

The analogous risk in AI systems: we celebrate a general agent's ability to work without a specified process, then try to scale that demonstration using more memory, supervisors, other agents, retries and context. Some of this compensates for the lack of an engineered production process.

The assistant proposed a progression:

1. **Explore the open problem:** use broad intelligence when the task or method is genuinely unclear.
2. **Discover operations:** identify repeated judgments, domain objects, dependencies and outputs.
3. **Engineer the process:** encode contracts, state transitions, policy, interfaces, exceptions and verification.
4. **Insert specialized semantic computation:** place models where inference adds distinct value.
5. **Measure and refine:** evaluate correctness, repeatability, latency, cost, failure cases and transferability.

The crucial qualification: **decomposing an agent into many tiny agents is not industrialization.** A pipeline of prompts with undefined semantics can remain just as fragile. The advance comes from **specifying the work and ownership boundaries**.

### Two different notions of progress

- **Capability progress:** A better model can solve a harder or broader problem.
- **System progress:** A better architecture solves a class of problems reliably, economically, repeatably and at scale.

The user's argument is that AI software should invest much more seriously in the second, without abandoning the first.

---

## 5. What role remains for open-ended agents?

The first assistant answer distinguished three regimes:

| Situation | Primary mechanism |
|---|---|
| Known process, known operation | Deterministic software |
| Known process, uncertain meaning | Bounded, typed semantic inference |
| Unknown process, open problem | Exploratory, bounded agentic work where justified |

The user challenged an easy complacency in the third category: **the fact that we can offload an unknown problem to an LLM should not encourage us to leave a recurring business process unknown forever**.

The sharpened interpretation is:

> An agent can help **discover, test and improve** a process. When enough of the process becomes known and repeatable, encode it in the product rather than asking an agent to rediscover it on every run.

There remain genuinely open-ended domains and one-off exploratory tasks. The goal is not to force every task into an assembly line, but to avoid paying an unbounded reasoning tax for repeated and increasingly well-understood work.

---

## 6. How the existing projects fit the philosophy

These connections were made conceptually in the conversation and informed by the existing repository documents. They are **not instructions to alter or dispatch projects**.

### Weavr: persistent intent, replaceable computation

The repository's architecture decisions describe projects, frames, missions, decisions and evidence as primary; individual agent sessions are subordinate. Relevant existing formulations:

> **“Model the work; rent the worker.”**

> **“Compile → Decide → Imagine.”**

Weavr provides semantic meaning and governance: explicit Needs, scope, authority, acceptable next actions and runtime routing. An agent does not own the mission's identity or truth.

Sources:
- [Weavr decisions](https://github.com/blackmath88/weavr/blob/main/DECISIONS.md)
- [Weavr / Paperclip comparison](https://github.com/blackmath88/weavr/blob/main/docs/PAPERCLIP-REFERENCE.md)
- [ChatGPT operating contract](https://github.com/blackmath88/weavr/blob/main/docs/CHATGPT-OPERATING-CONTRACT.md)

### FAICTORY: industrialized software delivery

The existing FAICTORY concept states:

> **“Never ask a model a question that typed state and deterministic code can answer.”**

It separates deterministic code, bounded semantic decisions, native coding harnesses, exceptional agent loops and human authority. It protects process boundaries through isolated workspaces, verification, evidence and digest-bound acceptance.

Source: [AI-efficient governed delivery](https://github.com/blackmath88/faictory/blob/main/docs/architecture/AI-EFFICIENT-DELIVERY-CONCEPT.md)

### Morrow / Nebuchadnezzar: interchangeable inference and execution

The local infrastructure is an opportunity to supply affordable semantic capability behind a well-defined interface, not necessarily to operate a persistent all-knowing agent. The system can choose between local, cheap hosted and frontier inference according to the operation's requirements.

### Changefield: domain software plus semantic operations

An organizational change application should explicitly model change cases, stakeholder relationships, impacts, evidence, interventions and evaluation. Models may interpret interview evidence, surface contradictions or propose an intervention. The application should **not need to rediscover change management from first principles for every case**.

### Blackboard / Paratext: intelligence in the interface, not only a chat window

Semantic capabilities can support discovery, comparison, navigation, explanation and context-sensitive views while ordinary application state and interactions remain fully engineered.

### Durable Objects: persistent coordination substrate

A Durable Object could host a stateful mission or workspace coordinator and call semantic capabilities as needed. It is an optional implementation technology, not the governance system itself. The distinction between coordination, canonical records, evidence and authority must survive any runtime choice.

---

## 7. A reference design principle

A possible pattern for an AI-augmented business operation:

```text
Domain event or user action
       |
       v
Typed application state + deterministic process
       |
       +--> Is the next operation fully specified?
       |       |
       |       +--> YES --> ordinary software executes
       |       |
       |       +--> NO, but semantic choice is bounded
       |                    |
       |                    v
       |              Semantic capability
       |              (typed input/output,
       |               provenance, abstention)
       |                    |
       |                    v
       |              Validate output
       |                    |
       |                    v
       |              Policy applies next action
       |
       +--> Open problem / missing process?
                      |
                      v
                Bounded exploration
                or human domain design
                      |
                      v
                Capture learning as
                process proposal, not
                silently promoted truth
```

A specialized semantic capability should ideally have:

- a defined domain question and reason for invoking inference;
- narrow, typed inputs and outputs;
- stable ownership of state **outside** the model call;
- evidence/provenance references;
- an explicit ability to abstain or raise uncertainty;
- authority separated from suggestion;
- measurable quality and expected failures;
- replaceable model/provider implementations;
- deterministic validation, gating and recovery around external effects.

---

## 8. The thesis in a few lines

**1. Stop building software around agents.** Build software with precise domain semantics that can invoke intelligence.

**2. Generality is a discovery advantage, not always a production advantage.** A model that can improvise any process does not remove the value of specifying recurring processes.

**3. Don't recreate software engineering inside prompts.** State, events, authority, scheduling, transactions, evidence and verification have established engineering solutions.

**4. Narrow the operation, not necessarily the intelligence.** Use powerful reasoning for a very small, difficult judgment when that is the right tool.

**5. Memory is application knowledge, not merely conversational recall.** Persist facts, decisions, evidence and intent in inspectable domain systems; derive semantic projections for each operation.

**6. Agentic exploration should produce reusable system knowledge.** Turn successful repeated improvisations into better architecture, not larger recurring prompts.

**7. Measure system progress as well as model progress.** The relevant outcomes include repeatability, accepted quality, trustworthiness, economics and transferability.

## 9. Candidate formulations for future writing

> **Software should be the architecture. Intelligence should be a capability.**

> **We should use LLMs to discover the process, not to compensate indefinitely for never engineering one.**

> **The model may be general; the operation should be specific.**

> **An agent is a powerful mechanic. A scalable product needs a factory.**

> **The next leap in AI software may not come from asking agents to do more, but from engineering more of what agents currently have to improvise.**

### The longer formulation

> AI gives us the ability to execute without first understanding the process. Software engineering gives us the ability to turn that understanding into something reproducible. The next leap will not come from making agents responsible for everything, but from discovering which parts of intelligence can become precise, composable and reusable capabilities inside well-engineered systems.

---

## 10. Open design questions

These remain questions, not agreed implementation work:

1. What criteria tell us that a recurring agent behavior is mature enough to become a deterministic or bounded semantic software component?
2. What is the minimal, portable interface for a semantic operation without creating another generic agent framework?
3. How do we measure specialized inference quality, calibration, abstention, costs and drift?
4. Which memory is canonical, which is an index, and which is disposable execution context?
5. Where should stateful coordination live (for example, Durable Objects), and where must evidence, meaning and human authority remain?
6. How can Weavr recognize repeated successful agent behavior and propose, but never autonomously authorize, a more specialized software implementation?

## Concluding idea

The argument is neither anti-LLM nor anti-agent. It is a demand to treat intelligence as a powerful **computational resource** rather than the default organizing unit of every application. The most valuable use of that resource may be to identify and implement the domain-specific instruments, processes and interfaces that let software systems become more capable *without needing to improvise everything again*.

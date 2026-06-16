---
id: boston
name: Project Boston
tagline: Strangler-fig migration vehicle.
role: Principal Engineer
stack:
  - Java
  - Redis
  - Liquibase
  - Spring
domains:
  - DAM
  - Proxy
year: 2024
url: "internal · architecture note"
href: "#"
abstract: BLOCKS
tone: "linear-gradient(135deg, #f8a41d22, #1a1a1a11)"
---

Pulled Smart Tagging out of Luma. Updates queue into Redis, picked up by a
single Boston Leader instance that throttles writes into MySQL. Established a
reusable pattern for any agent that needs to scale.

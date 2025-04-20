# Notification System Design for Insyd

## 1. Overview
 The notification system alerts users about activities such as new followers, comments, likes, or job postings from followed users or organic content discovery. 

## 2. Requirements

### 2.1 Functional

- Notify users of events: new followers, comments, likes, job postings.
- Support multiple channels: in-app notifications (primary for POC).
- Allow users to view their notifications.
- Trigger notifications based on user actions (e.g., someone comments on a post).

### 2.2 Non-Functional

- **Scalability**: Handle 100 DAUs now, scale to 1 million DAUs.
- **Performance**: Deliver notifications with low latency (&lt;1s for in-app).
- **Reliability**: Ensure notifications are not lost.
- **Cost**: Minimize infrastructure costs for a bootstrapped startup.
- **Simplicity**: Easy to implement and maintain for a small team.

## 3. System Components

### 3.1 Frontend (Next.js)

- **Notification UI**: Displays a list of notifications with details (e.g., "User X commented on your post").
- **Event Trigger**: Allows users to perform actions (e.g., comment, follow) that trigger notifications.

### 3.2 Backend (Node.js)

- **API Layer**: RESTful APIs to handle notification creation, retrieval, and event triggers.
- **Notification Service**: Processes events and generates notifications.
- **Event Handler**: Listens for user actions (e.g., comment, follow) and triggers notifications.

### 3.3 Database (MongoDB)

- **Users Collection**: Stores user data (ID, username, preferences).
- **Notifications Collection**: Stores notification details (recipient, type, message, status).
- **Events Collection**: Logs events that trigger notifications (e.g., comment, follow).

### 3.4 Message Queue (Optional for POC)

- For 100 DAUs, a queue is unnecessary, but for scalability, a queue (e.g., Redis or RabbitMQ) can decouple event processing and notification delivery.

## 4. Execution Flow

1. **Event Trigger**: A user performs an action (e.g., comments on a post) via the frontend, sending a request to the backend API.
2. **Event Storage**: The backend logs the event in the Events collection.
3. **Notification Generation**: The Notification Service processes the event, identifies recipients (e.g., post owner), and creates a notification in the Notifications collection.
4. **Notification Delivery**: For in-app notifications, the frontend polls the backend API to fetch new notifications for the user.
5. **Notification Display**: The frontend renders the notifications in the UI.

## 5. Data Schema

### 5.1 Users Collection

```json
{
  "_id": ObjectId,
  "username": String,
  "email": String,
  "createdAt": Date
}
```

### 5.2 Events Collection

```json
{
  "_id": ObjectId,
  "type": String, // e.g., "comment", "follow", "like"
  "actorId": ObjectId, // User who performed the action
  "targetId": ObjectId, // Post or user affected
  "createdAt": Date
}
```

### 5.3 Notifications Collection

```json
{
  "_id": ObjectId,
  "recipientId": ObjectId, // User to notify
  "type": String, // e.g., "comment", "follow"
  "message": String, // e.g., "User X commented on your post"
  "status": String, // "unread", "read"
  "createdAt": Date
}
```

## 6. API Endpoints

- **POST /api/events**: Log an event (e.g., comment, follow).
- **GET /api/notifications**: Fetch notifications for a user.
- **POST /api/notifications**: Create a notification (internal use by backend).

## 7. Scale Considerations

- **Database**: MongoDB scales horizontally with sharding for 1M DAUs. Use indexing on `recipientId` and `createdAt` for fast queries.
- **Backend**: Node.js can handle 100 DAUs on a single server. For 1M DAUs, use load balancers and auto-scaling.
- **Message Queue**: Introduce a queue (e.g., RabbitMQ) for asynchronous processing at scale.
- **Rate Limiting**: Implement rate limiting to prevent notification spam (e.g., max 10 notifications per user per minute).
- **Caching**: Use Redis to cache frequent queries (e.g., recent notifications) at scale.

## 8. Performance

- **Latency**: In-app notifications are fetched via API with &lt;1s latency for 100 DAUs.
- **Throughput**: MongoDB and Node.js can handle thousands of reads/writes per second, sufficient for 100 DAUs.
- **Optimization**: Use pagination for notification retrieval to reduce load.

## 9. Limitations

- **Synchronous Processing**: For 100 DAUs, synchronous event-to-notification processing is fine but may bottleneck at scale without a queue.
- **Single Channel**: POC focuses on in-app notifications; adding email/SMS requires third-party integrations (e.g., SendGrid, Twilio).
- **No Real-Time**: Polling is used for simplicity. WebSockets or Server-Sent Events are needed for real-time updates at scale.
- **No Auth**: POC omits authentication for simplicity, but production needs JWT or OAuth.

## 10. Trade-Offs

- **Cost vs. Scalability**: Synchronous processing and polling reduce initial costs but limit scalability. Queues and WebSockets increase complexity but are future-proof.
- **Simplicity vs. Features**: Excluding auth and caching simplifies the POC but requires refactoring for production.
- **Local MongoDB**: Using local MongoDB avoids cloud costs but requires manual setup for scaling.

## 11. Future Improvements

- Add WebSockets for real-time notifications.
- Integrate a message queue for asynchronous processing.
- Support multiple channels (email, SMS, push).
- Implement authentication and user preferences.
- Add analytics for notification engagement.

## 12. Conclusion

This design provides a simple, cost-effective notification system for 100 DAUs, using Next.js, Node.js, and MongoDB. It prioritizes functionality and ease of implementation while laying a foundation for scaling to 1M DAUs with additional components like queues and caching.
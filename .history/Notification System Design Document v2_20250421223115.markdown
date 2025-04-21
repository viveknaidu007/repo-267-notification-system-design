# Notification System Design for Insyd (Version 2)

## 1. Overview
Insyd is a social web platform for the Architecture Industry, targeting 1 million DAUs from India, with initial focus on 100 DAUs. The notification system alerts users about activities (e.g., follows, comments, likes) from followed users, followers, or organic content discovery. Version 2 enhances user-specific notification display and introduces basic AI for prioritization.

## 2. Requirements
### 2.1 Functional
- Notify users of events (follows, comments, likes, job postings).
- Display notifications for specific users via a frontend interface.
- Trigger notifications based on user actions.
- AI to prioritize or summarize notifications (e.g., high-priority events like follows).

### 2.2 Non-Functional
- **Scalability**: Handle 100 DAUs initially, scale to 1M DAUs.
- **Performance**: <1s latency for in-app notifications.
- **Reliability**: Ensure no notification loss.
- **Cost**: Minimize for a bootstrapped startup.
- **Simplicity**: Easy implementation for POC.

## 3. System Components
### 3.1 Frontend (Next.js)
- **Notification UI**: Displays user-specific notifications with a selection mechanism.
- **Event Trigger**: Allows actions (e.g., comment) to generate events.

### 3.2 Backend (Node.js)
- **API Layer**: RESTful APIs for events and notifications.
- **Notification Service**: Processes events, generates notifications, and applies AI logic.
- **Event Handler**: Triggers notifications based on actions.

### 3.3 Database (MongoDB)
- **Users Collection**: Stores user data (_id, username, preferences).
- **Notifications Collection**: Stores notifications (recipientId, type, message, status).
- **Events Collection**: Logs events (type, actorId, targetId).

### 3.4 AI Component
- Simple rule-based AI to prioritize notifications (e.g., weight follows > likes > comments).

## 4. Execution Flow
1. **Event Trigger**: User action (e.g., comment) sends a POST to `/api/events`.
2. **Event Storage**: Backend logs the event in the Events collection.
3. **Notification Generation**: Notification Service processes the event, applies AI prioritization, and saves to Notifications collection.
4. **Notification Delivery**: Frontend polls `/api/notifications?userId=USER_ID` to fetch user-specific notifications.
5. **Notification Display**: Frontend renders notifications for the selected user.

## 5. Data Schema
### 5.1 Users Collection
```json
{ "_id": ObjectId, "username": String, "email": String, "createdAt": Date }
```

### 5.2 Events Collection
```json
{ "_id": ObjectId, "type": String, "actorId": ObjectId, "targetId": ObjectId, "createdAt": Date }
```

### 5.3 Notifications Collection
```json
{ "_id": ObjectId, "recipientId": ObjectId, "type": String, "message": String, "status": String, "priority": Number, "createdAt": Date }
```

## 6. API Endpoints
- **POST /api/events**: Log an event.
- **GET /api/notifications?userId=USER_ID**: Fetch notifications for a user.

## 7. Scale Considerations
- **Database**: MongoDB with indexing on `recipientId` and `createdAt`; sharding for 1M DAUs.
- **Backend**: Single Node.js instance for 100 DAUs; load balancers for 1M DAUs.
- **AI**: Lightweight rules for 100 DAUs; scale with external AI API (e.g., xAI) for 1M DAUs.
- **Real-Time**: Polling for POC; WebSockets for scale.

## 8. Performance
- **Latency**: <1s with polling for 100 DAUs.
- **Throughput**: Sufficient for 100 DAUs; optimize with caching at scale.

## 9. Limitations
- **Synchronous Processing**: Bottleneck at scale without a queue.
- **Single Channel**: In-app only; email/SMS needs integration.
- **No Real-Time**: Polling limits responsiveness.
- **AI Simplicity**: Rule-based; complex AI requires external services.

## 10. AI Integration
- **Logic**: Assign priority (e.g., follow = 3, like = 2, comment = 1) and sort notifications.
- **Future**: Integrate xAI API for advanced summarization.

## 11. Future Improvements
- Add WebSockets for real-time updates.
- Implement a message queue (e.g., RabbitMQ).
- Support multiple notification channels.
- Enhance AI with machine learning.

## 12. Conclusion
This design supports 100 DAUs with user-specific notifications and basic AI, using Next.js, Node.js, and MongoDB. It’s scalable to 1M DAUs with additional components.
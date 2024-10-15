import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useFormData } from "@/components/FormDataContext.js";
import DraggableFlatList from "react-native-draggable-flatlist";

function MyResults() {
  const { submittedData, setSubmittedData } = useFormData();
  const [editingItem, setEditingItem] = useState(null); // Track the item being edited
  const [newData, setNewData] = useState({ name: "", email: "" }); // Temporary storage for edited data

  const handleDragEnd = ({ data }) => {
    setSubmittedData(data); // Update the submittedData with the new order
  };

  const handleDelete = (email) => {
    const updatedData = submittedData.filter((item) => item.email !== email);
    setSubmittedData(updatedData);
  };

  const handleEdit = (item) => {
    setEditingItem(item.email); // Set the current item as editable
    setNewData({ name: item.name, email: item.email }); // Pre-fill the input fields with current data
  };

  const handleSave = () => {
    // Update the submittedData array with the new edited data
    const updatedData = submittedData.map((item) =>
      item.email === editingItem ? newData : item
    );
    setSubmittedData(updatedData);
    setEditingItem(null); // Reset the editing state
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.innerContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <View style={styles.submittedContainer}>
          <Text style={styles.submittedTitle}>Submitted Data:</Text>

          {submittedData.length === 0 ? (
            <Text>No data submitted yet.</Text>
          ) : (
            <DraggableFlatList
              data={submittedData}
              onDragEnd={handleDragEnd}
              keyExtractor={(item) => `${item.name}-${item.email}`}
              renderItem={({ item, drag, isActive }) => (
                <TouchableOpacity
                  style={[{ opacity: isActive ? 0.5 : 1 }]}
                  onLongPress={drag}
                >
                  <View style={styles.item}>
                    {editingItem === item.email ? (
                      // Show editable input fields if this item is being edited
                      <View style={styles.editContainer}>
                        <TextInput
                          style={styles.input}
                          value={newData.name}
                          onChangeText={(text) =>
                            setNewData({ ...newData, name: text })
                          }
                          placeholder="Edit Name"
                          multiline={true} // Allow text to wrap
                        />
                        <TextInput
                          style={styles.input}
                          value={newData.email}
                          onChangeText={(text) =>
                            setNewData({ ...newData, email: text })
                          }
                          placeholder="Edit Email"
                          multiline={true} // Allow text to wrap
                        />
                        <TouchableOpacity
                          style={styles.saveButton}
                          onPress={handleSave}
                        >
                          <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      // Display the item normally if not in edit mode
                      <View style={styles.row}>
                        <View style={styles.textContainer}>
                          <Text>Name: {item.name}</Text>
                          <Text>Email: {item.email}</Text>
                        </View>
                        <View style={styles.buttonsContainer}>
                          <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => handleEdit(item)}
                          >
                            <Text style={styles.buttonText}>Edit</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleDelete(item.email)}
                          >
                            <Text style={styles.buttonText}>Delete</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  submittedContainer: {
    padding: 20,
  },
  submittedTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  item: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginRight: 10, // Add space between text and buttons
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#ff3333",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    marginRight: 10,
    flexGrow: 1,
    maxWidth: "70%", // Ensures the input doesn't take up too much space
    flexShrink: 1, // Allows the input to shrink when necessary
  },
  saveButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default MyResults;
